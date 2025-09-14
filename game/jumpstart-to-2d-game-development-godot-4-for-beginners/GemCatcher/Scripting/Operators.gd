@tool
extends EditorScript

func _run() -> void:
	
	print("----------")
	print(3 > 5 and 5 > 3)
	print(3 < 5 and 5 > 3)
	print(3 < 5 or 5 > 3)
	print(3 < 5 or 5 < 3)
	print(3 / 5)
	print(3 % 5)
	print(5 / 3)
	print(5 % 3)
	print(5 / 3.0)
	print(not not true)
	print("----------")
	
	pass
