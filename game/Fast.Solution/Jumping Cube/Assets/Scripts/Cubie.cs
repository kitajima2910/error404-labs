using UnityEngine;

public class Cubie : MonoBehaviour
{
    private Rigidbody2D rb;

    // Start is called once before the first execution of Update after the MonoBehaviour is created
    void Start()
    {
        rb = GetComponent<Rigidbody2D>();
    }

    // Update is called once per frame
    void Update()
    {
        if (Input.GetKeyDown(KeyCode.LeftArrow))
        {
            Jump(true);
        }

        if (Input.GetKeyDown(KeyCode.RightArrow))
        {
            Jump(false);
        }
    }

    public void Jump(bool smallJump)
    {
        if (smallJump)
        {
            rb.AddForce(new Vector2(9.8f * 12f, 9.8f * 20f));
        } 
        else
        {

        }
        
    }

    private void OnCollisionEnter2D(Collision2D collision)
    {
        if (collision.gameObject.tag == "Tile")
        {
            rb.linearVelocity = Vector2.zero;
            transform.position = new Vector3(collision.gameObject.transform.position.x, transform.position.y, transform.position.z);
        }
    }
}
