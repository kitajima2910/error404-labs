extends CharacterBody2D


const SPEED = 80.0
const JUMP_VELOCITY = -400.0

var direction = 1

func _physics_process(delta: float) -> void:
	# Add the gravity.
	if not is_on_floor():
		velocity += get_gravity() * delta
	
	velocity.x = direction * SPEED
	$AnimatedSprite2D.play("Run")
	
	if direction == 1:
		$AnimatedSprite2D.flip_h = true
	elif direction == -1:
		$AnimatedSprite2D.flip_h = false
		
	
	move_and_slide()

func _on_timer_loop_timeout() -> void:
	direction = -direction
