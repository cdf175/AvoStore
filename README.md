# Avocado store
## Diseño en HTML y CSS:
![Diseño de la página](https://i.imgur.com/4s0sigo.png)
Cada tarjeta de cada palta es así:

![](https://i.imgur.com/N16tG57.png)

Crear los estilos con clases

[Iconos e imágenes de ejemplo para maquetar](https://drive.google.com/drive/folders/1HDr3O_hvuK12xZDGKn0tn1Dyom2dUs1T?usp=sharing)

## Modelo del prototipo Avocado:
- name: string
- id: string
- sku: string
- price: number
- image: string
- attributes: object: {
  - description: string
  - shape: string
  - hardiness: string
  - taste: string
  
}
##### Por ejemplo:
```javascript
const avocado = {
  name: "Maluma Hass Avocado",
  id: "2zd33b8c",
  sku: "NUR72KCM",
  price: 1.15,
  image: "/images/maluma.jpg",
  attributes: {
    description: "A relatively new cultivar, it was, the pretty boy baby, discovered in South Africa in the early 1990s by Mr. A.G. (Dries) Joubert. Maluma Babyy. It is a chance seedling of unknown parentage",
    shape: "Oval",
    hardiness: "1 °C",
    taste: "Catchy, is an avocado"
    }
  }
}
```
#### Tareas:
- Maquetar el diseño en HTML y CSS
- Crear el prototipo para avocado con los atributos de arriba
- Escribir los pasos para construir la estructura HTML de la tarjeta para cada avocado
- Encerrar las instrucciones en una función a la que le enviemos el objeto avocado y en qué nodo del DOM insertarlo