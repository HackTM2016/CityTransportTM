from math import sqrt

import data
from init import app
from flask import jsonify, request
import importer


@app.route("/api/get_stations")
def get_stations():
	stations = importer.parse_stations_from_csv("Lines Stations and Junctions - Timisoara Public Transport - Denumiri-20152012.csv")
	return jsonify({'stations': [station.__dict__ for station in stations]})


@app.route("/api/get_lines")
def get_lines():
	lines = importer.parse_lines_from_csv("Lines Stations and Junctions - Timisoara Public Transport - Sheet1.csv")
	return jsonify({'lines': [line.__dict__ for line in lines]})


@app.route("/api/get_nearby_stations")
def get_nearby_stations():
	lat = float(request.args.get('lat'))
	lng = float(request.args.get('lng'))
	count = int(request.args.get('count'))
	stations = data.get_stations()
	sorted_list = []

	for station in stations:
		try:
			dist = ((lat - station.lat) ** 2 + (lng - station.lng) ** 2) ** 0.5
			sorted_list.append((station, dist))
		except TypeError:
			pass

	sorted_list.sort(key=lambda tup: tup[1])

	return jsonify({'stations': [sorted_list[index][0].__dict__ for index in range(count)]})

