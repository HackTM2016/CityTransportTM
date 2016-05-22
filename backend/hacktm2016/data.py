from collections import defaultdict
from typing import Sequence, Tuple, Dict

from beaker.cache import CacheManager
from beaker.util import parse_cache_config_options
import importer
import ratt
import velo
import boats

cache_opts = {
    'cache.type': 'memory',
    'cache.lock_dir': 'cache/lock'
}

cache = CacheManager(**parse_cache_config_options(cache_opts))

cache_opts = {
    'cache.type': 'file',
    'cache.data_dir': 'cache/data',
    'cache.lock_dir': 'cache/lock'
}

long_cache = CacheManager(**parse_cache_config_options(cache_opts))

known_stations_csv = "Lines Stations and Junctions - Timisoara Public Transport - Denumiri-20152012.csv"
known_lines_csv = "Timisoara Public Transport - Linii.csv"


@cache.cache('all_stations', expire=3600 * 24)
def get_stations() -> Dict[str, ratt.Station]:
	raw_name_to_station = { station.raw_name: station for station in importer.parse_stations_from_csv(known_stations_csv) }
	get_junction_stations.junction_name_to_stations = defaultdict(list)
	get_station.station_id_to_station = { }
	for station in raw_name_to_station.values():
		get_station.station_id_to_station[station.station_id] = station
		if station.junction_name:
			get_junction_stations.junction_name_to_stations[station.junction_name].append(station)
	get_junction_stations.junction_name_to_stations = dict(get_junction_stations.junction_name_to_stations)
	return raw_name_to_station


def get_station(station_id: int) -> ratt.Station:
	if not get_station.station_id_to_station:
		get_stations()

	return get_station.station_id_to_station[station_id]

get_station.station_id_to_station = None


def get_junction_stations(junction_name: str) -> Sequence[ratt.Station]:
	if not get_junction_stations.junction_name_to_stations:
		get_stations()

	return get_junction_stations.junction_name_to_stations[junction_name]

get_junction_stations.junction_name_to_stations = None


def get_stations_by_type(line_type: str) -> Sequence[ratt.Station]:
	if not get_stations_by_type.line_type_to_stations:
		get_routes()

	return get_stations_by_type.line_type_to_stations[line_type]

get_stations_by_type.line_type_to_stations = None


@cache.cache('all_lines', expire=3600 * 24)
def get_lines() -> Sequence[ratt.Line]:
	lines = importer.parse_lines_from_csv(known_lines_csv)
	get_line.line_id_to_line = { line.line_id: line for line in lines }
	return lines


def get_line(line_id: int) -> ratt.Line:
	if not get_line.line_id_to_line:
		get_lines()

	return get_line.line_id_to_line[line_id]

get_line.line_id_to_line = None


@cache.cache('all_routes', expire=3600 * 24)
def get_routes() -> Dict[int, Tuple[ratt.Route, ratt.Route]]:
	@long_cache.cache('routes', expire=3600 * 12)
	def _scrape():
		return ratt.get_route_info_from_infotraffic(known_lines_csv, known_stations_csv)

	line_id_to_routes = _scrape()
	get_station_routes.station_id_to_routes = defaultdict(list)
	get_stations_by_type.line_type_to_stations = defaultdict(set)
	for line in line_id_to_routes.values():
		for route in line:
			ln = get_line(route.line_id)
			for station in route.stations:
				get_station_routes.station_id_to_routes[station.station_id].append(route)
				if ln:
					get_stations_by_type.line_type_to_stations[ln.line_type].add(station)

	get_station_routes.station_id_to_routes = dict(get_station_routes.station_id_to_routes)
	get_stations_by_type.line_type_to_stations = dict(get_stations_by_type.line_type_to_stations)
	return line_id_to_routes


def get_station_routes(station_id: int) -> Sequence[ratt.Route]:
	if not get_station_routes.station_id_to_routes:
		get_routes()

	return get_station_routes.station_id_to_routes[station_id]

get_station_routes.station_id_to_routes = None


@cache.cache('line_arrivals', expire=30)
def get_arrivals(line_id: int):
	return ratt.get_arrivals_from_infotrafic(line_id, get_stations())


def get_arrival(line_id: int, route_id: int, station_id: int) -> ratt.Arrival:
	for arrival in get_arrivals(line_id)[route_id]:
		if arrival.station_id == station_id:
			return arrival

	return None


@cache.cache('bike_stations', expire=90000)
def get_bike_stations():
	return velo.get_stations_from_velo()


@cache.cache('mock_docks', expire=10)
def get_docks():
	return boats.get_mock_docks()