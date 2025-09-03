extends CharacterBody2D


const SPEED = 50.0
const JUMP_VELOCITY = -400.0

var direction = 1
var isLive = true

func _physics_process(delta: float) -> void:
	# Add the gravity.
	if not is_on_floor():
		velocity += get_gravity() * delta
	
	if isLive:
		velocity.x = direction * SPEED
		$AnimatedSprite2D.play("Run")
		
		if direction == 1:
			$AnimatedSprite2D.flip_h = true
		elif direction == -1:
			$AnimatedSprite2D.flip_h = false
		
	
	move_and_slide()

func _on_timer_loop_timeout() -> void:
	direction = -direction


func _on_dead_zone_body_entered(body: Node2D) -> void:
	if body.name == "player":
		$CollisionShape2D.queue_free()
		isLive = false
		$AnimatedSprite2D.play("Hit")
		$Timer.start()


func _on_timer_timeout() -> void:
	self.queue_free()


func _on_area_2d_body_entered(body: Node2D) -> void:
	if body.name == "player":
		$Area2D/CollisionShape2D.queue_free()
		Global.playerIsHited = true
		Global.playerHP -= 10
