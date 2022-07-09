import * as THREE from 'three';
let instance = null;

export default class Helper
{

    constructor()
    {
        // Singleton
        if(instance)
        {
            return instance;
        }
        instance = this;
    }

    getRandomVector3()
    {
        return new THREE.Vector3(
            ((Math.random()) - 0.5) * 10,
            ((Math.random()) - 0.5) * 10,
            ((Math.random()) - 0.5) * 10
        );
    }


    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
      }

    magnitude(vector3) 
    {
        return Math.sqrt(vector3.x * vector3.x + vector3.y * vector3.y + vector3.z * vector3.z);
    }

    isBetween(min, max, value)
    {
        return value > min && value < max;
    }

    getThreePositionFromScreenPosition(Vector3ScreenPosition, camera)
    {
        const positionInThreeSpace = new THREE.Vector3();
        const vec1 = new THREE.Vector3(
            (Vector3ScreenPosition.x / window.innerWidth) * 2 -1,
            - (Vector3ScreenPosition.y / window.innerHeight) * 2 + 1,
            0.5
        );
        vec1.unproject(camera.instance);
        vec1.sub(camera.instance.position).normalize();
        const distance1 = - camera.instance.position.z / vec1.z;
        return positionInThreeSpace.copy(camera.instance.position).add(vec1.multiplyScalar(distance1));
    }
}