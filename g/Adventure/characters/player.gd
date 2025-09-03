extends CharacterBody2D


const SPEED = 150.0
const JUMP_VELOCITY = -400.0


func _physics_process(delta: float) -> void:
	if Global.playerIsHited:
		$AnimatedSprite2D.play("Hit")
		await get_tree().create_timer(.2).timeout
		Global.playerIsHited = false
	
	# Add the gravity.
	if not is_on_floor():
		velocity += get_gravity() * delta
		
		if velocity.y > 0:
			$AnimatedSprite2D.play("Fall")
		else:
			$AnimatedSprite2D.play("Jump")

	# Handle jump.
	if Input.is_action_just_pressed("ui_accept") and is_on_floor():
		velocity.y = JUMP_VELOCITY

	# Get the input direction and handle the movement/deceleration.
	# As good practice, you should replace UI actions with custom gameplay actions.
	var direction := Input.get_axis("ui_left", "ui_right")
	if direction:
		
		if is_on_floor():
			$AnimatedSprite2D.play("Run")
			
		velocity.x = direction * SPEED
		
		if direction < 0:
			$AnimatedSprite2D.flip_h = true
		else:
			$AnimatedSprite2D.flip_h = false
			
	else:
		if is_on_floor() and !Global.playerIsHited:
			$AnimatedSprite2D.play("Idle")
			
		velocity.x = move_toward(velocity.x, 0, SPEED)

	move_and_slide()
