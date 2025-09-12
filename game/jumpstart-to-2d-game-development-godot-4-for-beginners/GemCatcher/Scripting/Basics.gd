@tool
extends EditorScript

func _run() -> void:
	
	print("----------")
	var hero = "Hoài"
	var age = 30
	var is_ring_bearer: bool = true
	var power_level: float = 95.5
	print(hero)
	print(age)
	print(type_string(typeof(hero)))
	print(type_string(typeof(age)))
	print(type_string(typeof(is_ring_bearer)))
	print(type_string(typeof(power_level)))
	
	var result = "%03s %03d %03s" % [
		hero, age, power_level
	]
	
	print(result)
	print("----------")
	
	pass
