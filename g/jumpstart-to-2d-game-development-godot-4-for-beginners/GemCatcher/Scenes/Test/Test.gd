extends Node2D

@onready var icon: Sprite2D = $Icon
@onready var icon2: Sprite2D = $Icon2

# Called when the node enters the scene tree for the first time.
func _ready() -> void:
	pass # Replace with function body.


# Called every frame. 'delta' is the elapsed time since the previous frame.
func _process(delta: float) -> void:
	icon.position.x = $Icon.position.x + 50 * delta
	icon2.rotation_degrees += 180 * delta
	pass
