using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class CubeRotation : MonoBehaviour
{
    Vector3 rotation;

    // Start is called before the first frame update
    void Start()
    {
        rotation = new Vector3(0, 600, 0);
    }

    // Update is called once per frame
    void Update()
    {
        transform.Rotate(rotation * Time.deltaTime);
    }
}
