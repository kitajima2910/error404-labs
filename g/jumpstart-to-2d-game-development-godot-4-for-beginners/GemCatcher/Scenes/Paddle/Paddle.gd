extends Area2D

const SPEED: float = 200.0

# Called when the node enters the scene tree for the first time.
func _ready() -> void:
	pass # Replace with function body.


# Called every frame. 'delta' is the elapsed time since the previous frame.
func _process(delta: float) -> void:
	
	if Input.is_action_pressed("move_left") == true:
		position.x -= SPEED * delta
	if Input.is_action_pressed("move_right") == true:
		position.x += SPEED * delta
	pass
