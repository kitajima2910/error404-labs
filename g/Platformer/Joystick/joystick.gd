extends Area2D

const MAX_DISTANCE = 100

@onready var background = $Background
@onready var handle = $Handle

var is_touching
var direction: Vector2 = Vector2.ZERO

# Called when the node enters the scene tree for the first time.
func _ready() -> void:
	pass # Replace with function body.


# Called every frame. 'delta' is the elapsed time since the previous frame.
func _process(delta: float) -> void:
	var joystick_position = global_position
	var mouse_position = get_global_mouse_position()
	
	direction = mouse_position - joystick_position
	var pos = mouse_position
	
	if is_touching:
		if (pos.distance_to(joystick_position) > MAX_DISTANCE):
			pos = joystick_position + direction.normalized() * MAX_DISTANCE
		
		handle.global_position = pos
	else:
		handle.global_position = joystick_position
		direction = Vector2.ZERO

func _input(event: InputEvent) -> void:
	if event is InputEventScreenTouch:
		is_touching = event.is_pressed()
	
func get_direction() -> Vector2:
	return direction.normalized()
