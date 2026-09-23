const imageId = "59042b47c295996dfa300193e93493c9";

const createItem = (id, name, price, description) => ({
  card: {
    info: {
      id,
      name,
      price: price * 100,
      description,
      imageId,
    },
  },
});

const createMenu = (name, cuisines, costForTwoMessage, categories) => ({
  cards: [
    {},
    {},
    {
      card: {
        card: { info: { name, cuisines, costForTwoMessage } },
      },
    },
    {},
    {
      groupedCard: {
        cardGroupMap: {
          REGULAR: {
            cards: categories.map(({ title, items }) => ({
              card: {
                card: {
                  "@type":
                    "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory",
                  title,
                  itemCards: items,
                },
              },
            })),
          },
        },
      },
    },
  ],
});

export const localRestaurantMenus = {
  "quickbite-pizza": createMenu(
    "Airport Centre Point - Sadar",
    ["North Indian", "Biryani", "Chinese"],
    "Rs. 300 for two",
    [
      {
        title: "Popular Dishes",
        items: [
          createItem("airport-biryani", "Chicken Biryani", 260, "Aromatic basmati rice with tender chicken."),
          createItem("airport-paneer", "Paneer Tikka", 220, "Char-grilled paneer with Indian spices."),
        ],
      },
      {
        title: "Main Course",
        items: [
          createItem("airport-butter-chicken", "Butter Chicken", 280, "Creamy tomato curry with soft chicken."),
          createItem("airport-naan", "Tandoori Naan", 60, "Fresh naan baked in a tandoor."),
        ],
      },
    ],
  ),
  "quickbite-bowl": createMenu(
    "Olio - The Wood Fired Pizzeria",
    ["Pizzas", "Pastas", "Italian"],
    "Rs. 300 for two",
    [
      {
        title: "Pizzas",
        items: [
          createItem("olio-margherita", "Margherita Pizza", 299, "Classic pizza with tomato, mozzarella and basil."),
          createItem("olio-farmhouse", "Farmhouse Pizza", 399, "Fresh vegetables with extra cheese."),
        ],
      },
      {
        title: "Pastas",
        items: [
          createItem("olio-alfredo", "Alfredo Pasta", 329, "Creamy penne pasta with herbs."),
        ],
      },
    ],
  ),
  "quickbite-burger": createMenu(
    "Subway",
    ["Sandwich", "Salads", "Wraps"],
    "Rs. 400 for two",
    [
      {
        title: "Signature Subs",
        items: [
          createItem("subway-paneer", "Paneer Tikka Sub", 249, "Toasted sub with paneer, vegetables and sauces."),
          createItem("subway-veggie", "Veggie Delite", 199, "Crunchy vegetables in freshly baked bread."),
        ],
      },
      {
        title: "Sides",
        items: [
          createItem("subway-cookie", "Chocolate Chip Cookie", 69, "Soft baked cookie with chocolate chips."),
        ],
      },
    ],
  ),
};