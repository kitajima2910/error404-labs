extends Area2D

const SPEED: float = 200.0

# Called when the node enters the scene tree for the first time.
func _ready() -> void:
	pass # Replace with function body.


# Called every frame. 'delta' is the elapsed time since the previous frame.
func _process(delta: float) -> void:
	
	#if Input.is_action_pressed("move_left") == true:
		#position.x -= SPEED * delta
	#if Input.is_action_pressed("move_right") == true:
		#position.x += SPEED * delta
	
	var movement: float = Input.get_axis("move_left", "move_right")
	position.x += SPEED * delta * movement
	
#	Lấy width x height của Paddle
	var text_size = $Sprite2D.texture.get_size()
	var width = text_size[0]
	var height = text_size[1]
		
	position.x = clampf(
		position.x,
		get_viewport_rect().position.x + width / 2,
		get_viewport_rect().end.x - width / 2
	)
	
	pass
