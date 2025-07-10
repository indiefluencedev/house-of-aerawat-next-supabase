// src/Data/products.js
const products = {
    categories: [
      { id: 1, name: "Fine Jewellery", slug: "fine-jewellery" },
      { id: 2, name: "Shringaar", slug: "shringaar" },
      { id: 3, name: "Kalapatt", slug: "kalapatt" },
      { id: 4, name: "Crystals", slug: "crystals" },
      { id: 5, name: "Wooden Beads", slug: "wooden-beads" },
      { id: 6, name: "Treasure Gift", slug: "treasure-gift" }
    ],
  products: [
    {
      id: 1,
      name: "Gold-Plated Chain-Set of 3",
      price: 500,
      category: "fine-jewellery",
      image: "/assets/products/cardimage.png",
      thumbnails: [
        "/assets/products/product1.png",
        "/assets/img.jpg",
        "/assets/products/product1.png",
        "/assets/img.jpg"
      ],
      description: "Lorem ipsum dolor sit amet consectetur...",
      shippingPolicy: [
        "Free shipping on orders over $50",
        "Delivery within 3-5 business days",
        "International shipping available"
      ],
      returnPolicy: [
        "30-day return policy",
        "Items must be unused with tags",
        "Customer pays return shipping"
      ]
    },
    {
      id: 2,
      name: "Traditional Maang Tikka",
      price: 39.99,
      category: "shringaar",
      image: "/assets/products/cardimage.png",
      thumbnails: [
        "/images/shringaar1-thumb1.jpg",
        "/images/shringaar1-thumb2.jpg"
      ],
      description: "Traditional Indian headpiece...",
      shippingPolicy: [
        "Free shipping on orders over $50",
        "Delivery within 3-5 business days"
      ],
      returnPolicy: [
        "30-day return policy",
        "Items must be unused with tags"
      ]
    },
    {
      id: 3,
      name: "Handcrafted Metal Earrings",
      price: 29.99,
      category: "kalapatt",
      image: "/assets/products/cardimage.png",
      thumbnails: [
        "/images/kalapatt1-thumb1.jpg",
        "/images/kalapatt1-thumb2.jpg"
      ],
      description: "Beautiful handcrafted metal jewellery...",
      shippingPolicy: [
        "Free shipping on orders over $50",
        "Delivery within 3-5 business days"
      ],
      returnPolicy: [
        "30-day return policy"
      ]
    },
    {
      id: 4,
      name: "Rose Quartz Pendant",
      price: 24.99,
      category: "crystals",
      image: "/assets/products/cardimage.png",
      thumbnails: [
        "/images/crystal1-thumb1.jpg",
        "/images/crystal1-thumb2.jpg"
      ],
      description: "Healing rose quartz crystal pendant...",
      shippingPolicy: [
        "Free shipping on orders over $50",
        "Delivery within 3-5 business days"
      ],
      returnPolicy: [
        "30-day return policy"
      ]
    },
    {
      id: 5,
      name: "Wooden Bead Bracelet",
      price: 19.99,
      category: "wooden-beads",
      image: "/assets/products/cardimage.png",
      thumbnails: [
        "/images/wooden1-thumb1.jpg",
        "/images/wooden1-thumb2.jpg"
      ],
      description: "Eco-friendly wooden bead bracelet...",
      shippingPolicy: [
        "Free shipping on orders over $50",
        "Delivery within 3-5 business days"
      ],
      returnPolicy: [
        "30-day return policy"
      ]
    },


    {
      id: 6,
      name: "product6",
      price: 600,
      category: "fine-jewellery",
      image: "/assets/products/cardimage.png",
      thumbnails: [
        "/images/product1-thumb1.jpg",
        "/images/product1-thumb2.jpg",
        "/images/product1-thumb3.jpg",
        "/images/product1-thumb4.jpg"
      ],
      description: "Lorem ipsum dolor sit amet consectetur. Mattis ut amet nunc pellentesque dictum orci sem. Proin mattis rhoncus est vulputate pellentesque nullam aenean vitae vivamus. At pulvinar parturient semper egestas diam. Ut suspendisse fringilla nisi congue turpis laoreet. Scelerisque gravida volutpat lorem risus donec imperdiet nunc dictum. Arcu vestibulum leo eu vel nibh dui turpis. Lorem ipsum dolor sit amet consectetur. Mattis ut amet nunc pellentesque dictum orci sem. Proin mattis rhoncus est vulputate pellentesque nullam aenean vitae vivamus. At pulvinar parturient semper egestas diam. Ut suspendisse fringilla nisi congue turpis laoreet. Scelerisque gravida volutpat lorem risus donec imperdiet nunc dictum. Arcu vestibulum leo eu vel nibh dui turpis.",
      shippingPolicy: [
        "Free shipping on orders over $50",
        "Delivery within 3-5 business days",
        "International shipping available"
      ],
      returnPolicy: [
        "30-day return policy",
        "Items must be unused with tags",
        "Customer pays return shipping"
      ]
    },

    {
      id: 7,
      name: "product7",
      price: 49.99,
      image: "/assets/products/cardimage.png",
      thumbnails: [
        "/images/product1-thumb1.jpg",
        "/images/product1-thumb2.jpg",
        "/images/product1-thumb3.jpg",
        "/images/product1-thumb4.jpg"
      ],
      description: "Lorem ipsum dolor sit amet consectetur. Mattis ut amet nunc pellentesque dictum orci sem. Proin mattis rhoncus est vulputate pellentesque nullam aenean vitae vivamus. At pulvinar parturient semper egestas diam. Ut suspendisse fringilla nisi congue turpis laoreet. Scelerisque gravida volutpat lorem risus donec imperdiet nunc dictum. Arcu vestibulum leo eu vel nibh dui turpis. Lorem ipsum dolor sit amet consectetur. Mattis ut amet nunc pellentesque dictum orci sem. Proin mattis rhoncus est vulputate pellentesque nullam aenean vitae vivamus. At pulvinar parturient semper egestas diam. Ut suspendisse fringilla nisi congue turpis laoreet. Scelerisque gravida volutpat lorem risus donec imperdiet nunc dictum. Arcu vestibulum leo eu vel nibh dui turpis.",
      shippingPolicy: [
        "Free shipping on orders over $50",
        "Delivery within 3-5 business days",
        "International shipping available"
      ],
      returnPolicy: [
        "30-day return policy",
        "Items must be unused with tags",
        "Customer pays return shipping"
      ]
    },

    {
      id: 8,
      name: "product8",
      price: 49.99,
      category: "kalapatt",
      image: "/assets/products/cardimage.png",
      thumbnails: [
        "/images/product1-thumb1.jpg",
        "/images/product1-thumb2.jpg",
        "/images/product1-thumb3.jpg",
        "/images/product1-thumb4.jpg"
      ],
      description: "Lorem ipsum dolor sit amet consectetur. Mattis ut amet nunc pellentesque dictum orci sem. Proin mattis rhoncus est vulputate pellentesque nullam aenean vitae vivamus. At pulvinar parturient semper egestas diam. Ut suspendisse fringilla nisi congue turpis laoreet. Scelerisque gravida volutpat lorem risus donec imperdiet nunc dictum. Arcu vestibulum leo eu vel nibh dui turpis. Lorem ipsum dolor sit amet consectetur. Mattis ut amet nunc pellentesque dictum orci sem. Proin mattis rhoncus est vulputate pellentesque nullam aenean vitae vivamus. At pulvinar parturient semper egestas diam. Ut suspendisse fringilla nisi congue turpis laoreet. Scelerisque gravida volutpat lorem risus donec imperdiet nunc dictum. Arcu vestibulum leo eu vel nibh dui turpis.",
      shippingPolicy: [
        "Free shipping on orders over $50",
        "Delivery within 3-5 business days",
        "International shipping available"
      ],
      returnPolicy: [
        "30-day return policy",
        "Items must be unused with tags",
        "Customer pays return shipping"
      ]
    },

    {
      id: 9,
      name: "product9",
      price: 49.99,
      image: "/assets/products/cardimage.png",
      thumbnails: [
        "/images/product1-thumb1.jpg",
        "/images/product1-thumb2.jpg",
        "/images/product1-thumb3.jpg",
        "/images/product1-thumb4.jpg"
      ],
      description: "Lorem ipsum dolor sit amet consectetur. Mattis ut amet nunc pellentesque dictum orci sem. Proin mattis rhoncus est vulputate pellentesque nullam aenean vitae vivamus. At pulvinar parturient semper egestas diam. Ut suspendisse fringilla nisi congue turpis laoreet. Scelerisque gravida volutpat lorem risus donec imperdiet nunc dictum. Arcu vestibulum leo eu vel nibh dui turpis. Lorem ipsum dolor sit amet consectetur. Mattis ut amet nunc pellentesque dictum orci sem. Proin mattis rhoncus est vulputate pellentesque nullam aenean vitae vivamus. At pulvinar parturient semper egestas diam. Ut suspendisse fringilla nisi congue turpis laoreet. Scelerisque gravida volutpat lorem risus donec imperdiet nunc dictum. Arcu vestibulum leo eu vel nibh dui turpis.",
      shippingPolicy: [
        "Free shipping on orders over $50",
        "Delivery within 3-5 business days",
        "International shipping available"
      ],
      returnPolicy: [
        "30-day return policy",
        "Items must be unused with tags",
        "Customer pays return shipping"
      ]
    },

    {
      id: 10,
      name: "product10",
      price: 49.99,
      category: "wooden-beads",
      image: "/assets/products/cardimage.png",
      thumbnails: [
        "/images/product1-thumb1.jpg",
        "/images/product1-thumb2.jpg",
        "/images/product1-thumb3.jpg",
        "/images/product1-thumb4.jpg"
      ],
      description: "Lorem ipsum dolor sit amet consectetur. Mattis ut amet nunc pellentesque dictum orci sem. Proin mattis rhoncus est vulputate pellentesque nullam aenean vitae vivamus. At pulvinar parturient semper egestas diam. Ut suspendisse fringilla nisi congue turpis laoreet. Scelerisque gravida volutpat lorem risus donec imperdiet nunc dictum. Arcu vestibulum leo eu vel nibh dui turpis. Lorem ipsum dolor sit amet consectetur. Mattis ut amet nunc pellentesque dictum orci sem. Proin mattis rhoncus est vulputate pellentesque nullam aenean vitae vivamus. At pulvinar parturient semper egestas diam. Ut suspendisse fringilla nisi congue turpis laoreet. Scelerisque gravida volutpat lorem risus donec imperdiet nunc dictum. Arcu vestibulum leo eu vel nibh dui turpis.",
      shippingPolicy: [
        "Free shipping on orders over $50",
        "Delivery within 3-5 business days",
        "International shipping available"
      ],
      returnPolicy: [
        "30-day return policy",
        "Items must be unused with tags",
        "Customer pays return shipping"
      ]
    },

    {
      id: 11,
      name: "product11",
      price: 1000,
      category: "fine-jewellery",
      image: "/assets/products/cardimage.png",
      thumbnails: [
        "/images/product1-thumb1.jpg",
        "/images/product1-thumb2.jpg",
        "/images/product1-thumb3.jpg",
        "/images/product1-thumb4.jpg"
      ],
      description: "Lorem ipsum dolor sit amet consectetur. Mattis ut amet nunc pellentesque dictum orci sem. Proin mattis rhoncus est vulputate pellentesque nullam aenean vitae vivamus. At pulvinar parturient semper egestas diam. Ut suspendisse fringilla nisi congue turpis laoreet. Scelerisque gravida volutpat lorem risus donec imperdiet nunc dictum. Arcu vestibulum leo eu vel nibh dui turpis. Lorem ipsum dolor sit amet consectetur. Mattis ut amet nunc pellentesque dictum orci sem. Proin mattis rhoncus est vulputate pellentesque nullam aenean vitae vivamus. At pulvinar parturient semper egestas diam. Ut suspendisse fringilla nisi congue turpis laoreet. Scelerisque gravida volutpat lorem risus donec imperdiet nunc dictum. Arcu vestibulum leo eu vel nibh dui turpis.",
      shippingPolicy: [
        "Free shipping on orders over $50",
        "Delivery within 3-5 business days",
        "International shipping available"
      ],
      returnPolicy: [
        "30-day return policy",
        "Items must be unused with tags",
        "Customer pays return shipping"
      ]
    },

    {
      id: 12,
      name: "product12",
      price: 49.99,
      category: "shringaar",
      image: "/assets/products/cardimage.png",
      thumbnails: [
        "/images/product1-thumb1.jpg",
        "/images/product1-thumb2.jpg",
        "/images/product1-thumb3.jpg",
        "/images/product1-thumb4.jpg"
      ],
      description: "Lorem ipsum dolor sit amet consectetur. Mattis ut amet nunc pellentesque dictum orci sem. Proin mattis rhoncus est vulputate pellentesque nullam aenean vitae vivamus. At pulvinar parturient semper egestas diam. Ut suspendisse fringilla nisi congue turpis laoreet. Scelerisque gravida volutpat lorem risus donec imperdiet nunc dictum. Arcu vestibulum leo eu vel nibh dui turpis. Lorem ipsum dolor sit amet consectetur. Mattis ut amet nunc pellentesque dictum orci sem. Proin mattis rhoncus est vulputate pellentesque nullam aenean vitae vivamus. At pulvinar parturient semper egestas diam. Ut suspendisse fringilla nisi congue turpis laoreet. Scelerisque gravida volutpat lorem risus donec imperdiet nunc dictum. Arcu vestibulum leo eu vel nibh dui turpis.",
      shippingPolicy: [
        "Free shipping on orders over $50",
        "Delivery within 3-5 business days",
        "International shipping available"
      ],
      returnPolicy: [
        "30-day return policy",
        "Items must be unused with tags",
        "Customer pays return shipping"
      ]
    },

    {
      id: 13,
      name: "product13",
      price: 49.99,
      category: "kalapatt",
      image: "/assets/products/cardimage.png",
      thumbnails: [
        "/images/product1-thumb1.jpg",
        "/images/product1-thumb2.jpg",
        "/images/product1-thumb3.jpg",
        "/images/product1-thumb4.jpg"
      ],
      description: "Lorem ipsum dolor sit amet consectetur. Mattis ut amet nunc pellentesque dictum orci sem. Proin mattis rhoncus est vulputate pellentesque nullam aenean vitae vivamus. At pulvinar parturient semper egestas diam. Ut suspendisse fringilla nisi congue turpis laoreet. Scelerisque gravida volutpat lorem risus donec imperdiet nunc dictum. Arcu vestibulum leo eu vel nibh dui turpis. Lorem ipsum dolor sit amet consectetur. Mattis ut amet nunc pellentesque dictum orci sem. Proin mattis rhoncus est vulputate pellentesque nullam aenean vitae vivamus. At pulvinar parturient semper egestas diam. Ut suspendisse fringilla nisi congue turpis laoreet. Scelerisque gravida volutpat lorem risus donec imperdiet nunc dictum. Arcu vestibulum leo eu vel nibh dui turpis.",
      shippingPolicy: [
        "Free shipping on orders over $50",
        "Delivery within 3-5 business days",
        "International shipping available"
      ],
      returnPolicy: [
        "30-day return policy",
        "Items must be unused with tags",
        "Customer pays return shipping"
      ]
    },

    {
      id: 14,
      name: "product14",
      price: 49.99,
      category: "crystals",
      image: "/assets/products/cardimage.png",
      thumbnails: [
        "/images/product1-thumb1.jpg",
        "/images/product1-thumb2.jpg",
        "/images/product1-thumb3.jpg",
        "/images/product1-thumb4.jpg"
      ],
      description: "Lorem ipsum dolor sit amet consectetur. Mattis ut amet nunc pellentesque dictum orci sem. Proin mattis rhoncus est vulputate pellentesque nullam aenean vitae vivamus. At pulvinar parturient semper egestas diam. Ut suspendisse fringilla nisi congue turpis laoreet. Scelerisque gravida volutpat lorem risus donec imperdiet nunc dictum. Arcu vestibulum leo eu vel nibh dui turpis. Lorem ipsum dolor sit amet consectetur. Mattis ut amet nunc pellentesque dictum orci sem. Proin mattis rhoncus est vulputate pellentesque nullam aenean vitae vivamus. At pulvinar parturient semper egestas diam. Ut suspendisse fringilla nisi congue turpis laoreet. Scelerisque gravida volutpat lorem risus donec imperdiet nunc dictum. Arcu vestibulum leo eu vel nibh dui turpis.",
      shippingPolicy: [
        "Free shipping on orders over $50",
        "Delivery within 3-5 business days",
        "International shipping available"
      ],
      returnPolicy: [
        "30-day return policy",
        "Items must be unused with tags",
        "Customer pays return shipping"
      ]
    },

    {
      id: 15,
      name: "product15",
      price: 49.99,
      category: "wooden-beads",
      image: "/assets/products/cardimage.png",
      thumbnails: [
        "/images/product1-thumb1.jpg",
        "/images/product1-thumb2.jpg",
        "/images/product1-thumb3.jpg",
        "/images/product1-thumb4.jpg"
      ],
      description: "Lorem ipsum dolor sit amet consectetur. Mattis ut amet nunc pellentesque dictum orci sem. Proin mattis rhoncus est vulputate pellentesque nullam aenean vitae vivamus. At pulvinar parturient semper egestas diam. Ut suspendisse fringilla nisi congue turpis laoreet. Scelerisque gravida volutpat lorem risus donec imperdiet nunc dictum. Arcu vestibulum leo eu vel nibh dui turpis. Lorem ipsum dolor sit amet consectetur. Mattis ut amet nunc pellentesque dictum orci sem. Proin mattis rhoncus est vulputate pellentesque nullam aenean vitae vivamus. At pulvinar parturient semper egestas diam. Ut suspendisse fringilla nisi congue turpis laoreet. Scelerisque gravida volutpat lorem risus donec imperdiet nunc dictum. Arcu vestibulum leo eu vel nibh dui turpis.",
      shippingPolicy: [
        "Free shipping on orders over $50",
        "Delivery within 3-5 business days",
        "International shipping available"
      ],
      returnPolicy: [
        "30-day return policy",
        "Items must be unused with tags",
        "Customer pays return shipping"
      ]
    },

    {
      id: 16,
      name: "product16",
      price: 1500,
      category: "fine-jewellery",
      image: "/assets/products/cardimage.png",
      thumbnails: [
        "/images/product1-thumb1.jpg",
        "/images/product1-thumb2.jpg",
        "/images/product1-thumb3.jpg",
        "/images/product1-thumb4.jpg"
      ],
      description: "Lorem ipsum dolor sit amet consectetur. Mattis ut amet nunc pellentesque dictum orci sem. Proin mattis rhoncus est vulputate pellentesque nullam aenean vitae vivamus. At pulvinar parturient semper egestas diam. Ut suspendisse fringilla nisi congue turpis laoreet. Scelerisque gravida volutpat lorem risus donec imperdiet nunc dictum. Arcu vestibulum leo eu vel nibh dui turpis. Lorem ipsum dolor sit amet consectetur. Mattis ut amet nunc pellentesque dictum orci sem. Proin mattis rhoncus est vulputate pellentesque nullam aenean vitae vivamus. At pulvinar parturient semper egestas diam. Ut suspendisse fringilla nisi congue turpis laoreet. Scelerisque gravida volutpat lorem risus donec imperdiet nunc dictum. Arcu vestibulum leo eu vel nibh dui turpis.",
      shippingPolicy: [
        "Free shipping on orders over $50",
        "Delivery within 3-5 business days",
        "International shipping available"
      ],
      returnPolicy: [
        "30-day return policy",
        "Items must be unused with tags",
        "Customer pays return shipping"
      ]
    },

    {
      id: 17,
      name: "product17",
      price: 49.99,
      category: "shringaar",
      image: "/assets/products/cardimage.png",
      thumbnails: [
        "/images/product1-thumb1.jpg",
        "/images/product1-thumb2.jpg",
        "/images/product1-thumb3.jpg",
        "/images/product1-thumb4.jpg"
      ],
      description: "Lorem ipsum dolor sit amet consectetur. Mattis ut amet nunc pellentesque dictum orci sem. Proin mattis rhoncus est vulputate pellentesque nullam aenean vitae vivamus. At pulvinar parturient semper egestas diam. Ut suspendisse fringilla nisi congue turpis laoreet. Scelerisque gravida volutpat lorem risus donec imperdiet nunc dictum. Arcu vestibulum leo eu vel nibh dui turpis. Lorem ipsum dolor sit amet consectetur. Mattis ut amet nunc pellentesque dictum orci sem. Proin mattis rhoncus est vulputate pellentesque nullam aenean vitae vivamus. At pulvinar parturient semper egestas diam. Ut suspendisse fringilla nisi congue turpis laoreet. Scelerisque gravida volutpat lorem risus donec imperdiet nunc dictum. Arcu vestibulum leo eu vel nibh dui turpis.",
      shippingPolicy: [
        "Free shipping on orders over $50",
        "Delivery within 3-5 business days",
        "International shipping available"
      ],
      returnPolicy: [
        "30-day return policy",
        "Items must be unused with tags",
        "Customer pays return shipping"
      ]
    },

    {
      id: 18,
      name: "product18",
      price: 49.99,
      image: "/assets/products/cardimage.png",
      thumbnails: [
        "/images/product1-thumb1.jpg",
        "/images/product1-thumb2.jpg",
        "/images/product1-thumb3.jpg",
        "/images/product1-thumb4.jpg"
      ],
      description: "Lorem ipsum dolor sit amet consectetur. Mattis ut amet nunc pellentesque dictum orci sem. Proin mattis rhoncus est vulputate pellentesque nullam aenean vitae vivamus. At pulvinar parturient semper egestas diam. Ut suspendisse fringilla nisi congue turpis laoreet. Scelerisque gravida volutpat lorem risus donec imperdiet nunc dictum. Arcu vestibulum leo eu vel nibh dui turpis. Lorem ipsum dolor sit amet consectetur. Mattis ut amet nunc pellentesque dictum orci sem. Proin mattis rhoncus est vulputate pellentesque nullam aenean vitae vivamus. At pulvinar parturient semper egestas diam. Ut suspendisse fringilla nisi congue turpis laoreet. Scelerisque gravida volutpat lorem risus donec imperdiet nunc dictum. Arcu vestibulum leo eu vel nibh dui turpis.",
      shippingPolicy: [
        "Free shipping on orders over $50",
        "Delivery within 3-5 business days",
        "International shipping available"
      ],
      returnPolicy: [
        "30-day return policy",
        "Items must be unused with tags",
        "Customer pays return shipping"
      ]
    },

    {
      id: 19,
      name: "product19",
      price: 49.99,
      category: "crystals",
      image: "/assets/products/cardimage.png",
      thumbnails: [
        "/images/product1-thumb1.jpg",
        "/images/product1-thumb2.jpg",
        "/images/product1-thumb3.jpg",
        "/images/product1-thumb4.jpg"
      ],
      description: "Lorem ipsum dolor sit amet consectetur. Mattis ut amet nunc pellentesque dictum orci sem. Proin mattis rhoncus est vulputate pellentesque nullam aenean vitae vivamus. At pulvinar parturient semper egestas diam. Ut suspendisse fringilla nisi congue turpis laoreet. Scelerisque gravida volutpat lorem risus donec imperdiet nunc dictum. Arcu vestibulum leo eu vel nibh dui turpis. Lorem ipsum dolor sit amet consectetur. Mattis ut amet nunc pellentesque dictum orci sem. Proin mattis rhoncus est vulputate pellentesque nullam aenean vitae vivamus. At pulvinar parturient semper egestas diam. Ut suspendisse fringilla nisi congue turpis laoreet. Scelerisque gravida volutpat lorem risus donec imperdiet nunc dictum. Arcu vestibulum leo eu vel nibh dui turpis.",
      shippingPolicy: [
        "Free shipping on orders over $50",
        "Delivery within 3-5 business days",
        "International shipping available"
      ],
      returnPolicy: [
        "30-day return policy",
        "Items must be unused with tags",
        "Customer pays return shipping"
      ]
    },

    {
      id: 20,
      name: "product20",
      price: 49.99,
      category: "wooden-beads",
      image: "/assets/products/cardimage.png",
      thumbnails: [
        "/images/product1-thumb1.jpg",
        "/images/product1-thumb2.jpg",
        "/images/product1-thumb3.jpg",
        "/images/product1-thumb4.jpg"
      ],
      description: "Lorem ipsum dolor sit amet consectetur. Mattis ut amet nunc pellentesque dictum orci sem. Proin mattis rhoncus est vulputate pellentesque nullam aenean vitae vivamus. At pulvinar parturient semper egestas diam. Ut suspendisse fringilla nisi congue turpis laoreet. Scelerisque gravida volutpat lorem risus donec imperdiet nunc dictum. Arcu vestibulum leo eu vel nibh dui turpis. Lorem ipsum dolor sit amet consectetur. Mattis ut amet nunc pellentesque dictum orci sem. Proin mattis rhoncus est vulputate pellentesque nullam aenean vitae vivamus. At pulvinar parturient semper egestas diam. Ut suspendisse fringilla nisi congue turpis laoreet. Scelerisque gravida volutpat lorem risus donec imperdiet nunc dictum. Arcu vestibulum leo eu vel nibh dui turpis.",
      shippingPolicy: [
        "Free shipping on orders over $50",
        "Delivery within 3-5 business days",
        "International shipping available"
      ],
      returnPolicy: [
        "30-day return policy",
        "Items must be unused with tags",
        "Customer pays return shipping"
      ]
    },

    {
      id: 21,
      name: "product21",
      price: 600,
      category: "fine-jewellery",
      image: "/assets/products/cardimage.png",
      thumbnails: [
        "/images/product1-thumb1.jpg",
        "/images/product1-thumb2.jpg",
        "/images/product1-thumb3.jpg",
        "/images/product1-thumb4.jpg"
      ],
      description: "Lorem ipsum dolor sit amet consectetur. Mattis ut amet nunc pellentesque dictum orci sem. Proin mattis rhoncus est vulputate pellentesque nullam aenean vitae vivamus. At pulvinar parturient semper egestas diam. Ut suspendisse fringilla nisi congue turpis laoreet. Scelerisque gravida volutpat lorem risus donec imperdiet nunc dictum. Arcu vestibulum leo eu vel nibh dui turpis. Lorem ipsum dolor sit amet consectetur. Mattis ut amet nunc pellentesque dictum orci sem. Proin mattis rhoncus est vulputate pellentesque nullam aenean vitae vivamus. At pulvinar parturient semper egestas diam. Ut suspendisse fringilla nisi congue turpis laoreet. Scelerisque gravida volutpat lorem risus donec imperdiet nunc dictum. Arcu vestibulum leo eu vel nibh dui turpis.",
      shippingPolicy: [
        "Free shipping on orders over $50",
        "Delivery within 3-5 business days",
        "International shipping available"
      ],
      returnPolicy: [
        "30-day return policy",
        "Items must be unused with tags",
        "Customer pays return shipping"
      ]
    },

    {
      id: 22,
      name: "product22",
      price: 49.99,
      category: "shringaar",
      image: "/assets/products/cardimage.png",
      thumbnails: [
        "/images/product1-thumb1.jpg",
        "/images/product1-thumb2.jpg",
        "/images/product1-thumb3.jpg",
        "/images/product1-thumb4.jpg"
      ],
      description: "Lorem ipsum dolor sit amet consectetur. Mattis ut amet nunc pellentesque dictum orci sem. Proin mattis rhoncus est vulputate pellentesque nullam aenean vitae vivamus. At pulvinar parturient semper egestas diam. Ut suspendisse fringilla nisi congue turpis laoreet. Scelerisque gravida volutpat lorem risus donec imperdiet nunc dictum. Arcu vestibulum leo eu vel nibh dui turpis. Lorem ipsum dolor sit amet consectetur. Mattis ut amet nunc pellentesque dictum orci sem. Proin mattis rhoncus est vulputate pellentesque nullam aenean vitae vivamus. At pulvinar parturient semper egestas diam. Ut suspendisse fringilla nisi congue turpis laoreet. Scelerisque gravida volutpat lorem risus donec imperdiet nunc dictum. Arcu vestibulum leo eu vel nibh dui turpis.",
      shippingPolicy: [
        "Free shipping on orders over $50",
        "Delivery within 3-5 business days",
        "International shipping available"
      ],
      returnPolicy: [
        "30-day return policy",
        "Items must be unused with tags",
        "Customer pays return shipping"
      ]
    },

    {
      id: 23,
      name: "product23",
      price: 49.99,
      image: "/assets/products/cardimage.png",
      thumbnails: [
        "/images/product1-thumb1.jpg",
        "/images/product1-thumb2.jpg",
        "/images/product1-thumb3.jpg",
        "/images/product1-thumb4.jpg"
      ],
      description: "Lorem ipsum dolor sit amet consectetur. Mattis ut amet nunc pellentesque dictum orci sem. Proin mattis rhoncus est vulputate pellentesque nullam aenean vitae vivamus. At pulvinar parturient semper egestas diam. Ut suspendisse fringilla nisi congue turpis laoreet. Scelerisque gravida volutpat lorem risus donec imperdiet nunc dictum. Arcu vestibulum leo eu vel nibh dui turpis. Lorem ipsum dolor sit amet consectetur. Mattis ut amet nunc pellentesque dictum orci sem. Proin mattis rhoncus est vulputate pellentesque nullam aenean vitae vivamus. At pulvinar parturient semper egestas diam. Ut suspendisse fringilla nisi congue turpis laoreet. Scelerisque gravida volutpat lorem risus donec imperdiet nunc dictum. Arcu vestibulum leo eu vel nibh dui turpis.",
      shippingPolicy: [
        "Free shipping on orders over $50",
        "Delivery within 3-5 business days",
        "International shipping available"
      ],
      returnPolicy: [
        "30-day return policy",
        "Items must be unused with tags",
        "Customer pays return shipping"
      ]
    },

    {
      id: 24,
      name: "product24",
      price: 49.99,
      image: "/assets/products/cardimage.png",
      thumbnails: [
        "/images/product1-thumb1.jpg",
        "/images/product1-thumb2.jpg",
        "/images/product1-thumb3.jpg",
        "/images/product1-thumb4.jpg"
      ],
      description: "Lorem ipsum dolor sit amet consectetur. Mattis ut amet nunc pellentesque dictum orci sem. Proin mattis rhoncus est vulputate pellentesque nullam aenean vitae vivamus. At pulvinar parturient semper egestas diam. Ut suspendisse fringilla nisi congue turpis laoreet. Scelerisque gravida volutpat lorem risus donec imperdiet nunc dictum. Arcu vestibulum leo eu vel nibh dui turpis. Lorem ipsum dolor sit amet consectetur. Mattis ut amet nunc pellentesque dictum orci sem. Proin mattis rhoncus est vulputate pellentesque nullam aenean vitae vivamus. At pulvinar parturient semper egestas diam. Ut suspendisse fringilla nisi congue turpis laoreet. Scelerisque gravida volutpat lorem risus donec imperdiet nunc dictum. Arcu vestibulum leo eu vel nibh dui turpis.",
      shippingPolicy: [
        "Free shipping on orders over $50",
        "Delivery within 3-5 business days",
        "International shipping available"
      ],
      returnPolicy: [
        "30-day return policy",
        "Items must be unused with tags",
        "Customer pays return shipping"
      ]
    },
  ]
};

export default products;
