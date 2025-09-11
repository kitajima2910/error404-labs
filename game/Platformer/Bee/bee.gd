extends CharacterBody2D


const SPEED = 3000.0
const JUMP_VELOCITY = -400.0

@onready var anim = get_node("Container/AnimatedSprite2D")
@onready var container = get_node("Container")
@onready var player = get_node("../Player")

var player_in_sight

func _ready() -> void:
	anim.play("Idile")

func _physics_process(delta: float) -> void:
	
	if player_in_sight:
		velocity = (player.position - self.position).normalized() * SPEED * delta
		
		if self.position.x > player.position.x:
			container.scale.x = 1
		elif self.position.x < player.position.x:
			container.scale.x = -1
	
	move_and_slide()


func _on_area_2d_body_entered(body: Node2D) -> void:
	if body.name == "Player":
		get_tree().change_scene_to_file("res://world.tscn")


func _on_player_in_sight(body: Node2D) -> void:
	if body.name == "Player":
		player_in_sight = true
