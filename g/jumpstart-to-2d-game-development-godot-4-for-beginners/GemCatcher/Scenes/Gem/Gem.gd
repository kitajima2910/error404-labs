extends Area2D

class_name Gem

signal gem_off_screen

const SPEED: float = 100.0

# Called when the node enters the scene tree for the first time.
func _ready() -> void:
	pass # Replace with function body.


# Called every frame. 'delta' is the elapsed time since the previous frame.
func _process(delta: float) -> void:
	
	position.y += SPEED * delta
	
	if position.y > get_viewport_rect().end.y:
		#print("Gem falls off")
		gem_off_screen.emit()
		die()
	
	pass


func die() -> void:
	
	set_process(false)
	queue_free()
	
	pass


func _on_area_entered(area: Area2D) -> void:
	
	#print("area: ", area)
	die()
	
	pass
