const products = [
  {
    id: 1,
    name: "Campus 00s Shoes",
    price: 6599.9,
    discount: 10,
    image: "https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/ce738cbe5342421996feaf5001044964_9366/Campus_00s_Shoes_Grey_HQ8707_01_standard.jpg",
    category: "Running Shoes",
    description: "High-performance running shoes"
  },
  {
    id: 2,
    name: "Forum 84 Hi Shoes",
    price: 12999,
    discount: 5,
    image: "https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/e9a958e5950d4495ac5d38c50fb5bb9c_9366/Forum_84_Hi_Shoes_Blue_IF7236_01_standard.jpg",
    category: "Casual Shoes",
    description: "Classic streetwear shoes"
  },
  {
    id: 3,
    name: "Drop Step Low 2.0 IKD ",
    price: 4799.5,
    discount: 15,
    image: "https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/fdd12183ab224a1dacb739d927b619c9_9366/Drop_Step_Low_2.0_IKD_Shoes_Multicolor_JL1877_01_00_standard.jpg",
    category: "Lifestyle Shoes",
    description: "Comfortable lifestyle shoes"
  },
   {
    id: 4,
    name: "Temper Run 2.0 Shoes",
    price: 5599.9,
    discount: 10,
    image: "https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/2a173d453c6043f2a720c4e1d5bec8f6_9366/Temper_Run_2.0_Shoes_White_JH5492_01_00_standard.jpg",
    category: "Running Shoes",
    description: "High-performance running shoes"
  },
  {
    id: 5,
    name: "Forum Bold Stripes Shoes",
    price: 10999,
    discount: 5,
    image: "https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/9c07d7d23c8a44aa8a82af560127c124_9366/Forum_Bold_Stripes_Shoes_White_ID6843_01_standard.jpg",
    category: "Casual Shoes",
    description: "Classic streetwear shoes"
  },
  {
    id: 6,
    name: "Samba OG Shoes",
    price: 10999.5,
    discount: 15,
    image: "https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/3f4e6566c2c74870a295454720f86521_9366/Samba_OG_Shoes_Red_JR0881_01_00_standard.jpg",
    category: "Lifestyle Shoes",
    description: "Comfortable lifestyle shoes"
  },
   {
    id: 7,
    name: "50s Soule Shoes",
    price: 2899.9,
    discount: 10,
    image: "https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/6fa279dbcb73434c821da4b625677cdc_9366/50s_Soule_Shoes_White_JK2517_01_00_standard.jpg",
    category: "Running Shoes",
    description: "High-performance running shoes"
  },
  {
    id: 8,
    name: "SL 72 RS MERCEDES ",
    price: 10999,
    discount: 5,
    image: "https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/4938557cd860444380df09442bb08ad6_9366/SL_72_RS_MERCEDES_SHOES_Black_JQ1782_01_00_standard.jpg",
    category: "Casual Shoes",
    description: "Classic streetwear shoes"
  },
  {
    id: 9,
    name: "Samoa Shoes",
    price: 4799.5,
    discount: 15,
    image: "https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/27df3334e66249f9be9af1d9780c93ac_9366/Samoa_Shoes_White_JH9079_01_standard.jpg",
    category: "Lifestyle Shoes",
    description: "Comfortable lifestyle shoes"
  },
   {
    id: 10,
    name: "Superstar II Shoes",
    price: 9999.9,
    discount: 10,
    image: "https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/1a6c516af64c4832829354533392a713_9366/Superstar_II_Shoes_Black_JI0079_01_standard.jpg",
    category: "Running Shoes",
    description: "High-performance running shoes"
  },
  {
    id: 11,
    name: "Adizero EVO SL Shoes",
    price: 15999,
    discount: 5,
    image: "https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/5d40adba58d446cfb32e20b75f966cbe_9366/Adizero_EVO_SL_Shoes_Black_JP7149_01_00_standard.jpg",
    category: "Casual Shoes",
    description: "Classic streetwear shoes"
  },
  {
    id: 12,
    name: "Superstar II Shoes",
    price: 9999.5,
    discount: 15,
    image: "https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/75a612c9f0a5421eb75587af5ef4c94a_9366/Superstar_II_Shoes_Black_JQ3176_01_00_standard.jpg",
    category: "Lifestyle Shoes",
    description: "Comfortable lifestyle shoes"
  },
   {
    id: 13,
    name: "OZWEEGO Shoes",
    price: 12999.9,
    discount: 10,
    image: "https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/86dbbccdb3db4f5f846eaa7600ee8b42_9366/OZWEEGO_Shoes_Black_EE6999_01_00_standard.jpg",
    category: "Running Shoes",
    description: "High-performance running shoes"
  },
  {
    id: 14,
    name: "OZMILLEN Shoes",
    price: 12999,
    discount: 5,
    image: "https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/0184b95a5db14b139b8d183cd2756108_9366/OZMILLEN_Shoes_Beige_IF9597_01_00_standard.jpg",
    category: "Casual Shoes",
    description: "Classic streetwear shoes"
  },
  {
    id: 15,
    name: "Superstar II Shoes",
    price: 7799.5,
    discount: 15,
    image: "https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/1c8636740a7641489efcf492ffb6d0f6_9366/Superstar_II_Shoes_Black_JH5470_01_standard.jpg",
    category: "Lifestyle Shoes",
    description: "Comfortable lifestyle shoes"
  },

    {
    id: 16,
    name: "Alpharesponse Shoes",
    price: 5399.9,
    discount: 10,
    image: "https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/4c929d6b9fc24fdda00ea4af094003d2_9366/Alpharesponse_Shoes_White_IE6347_01_standard.jpg",
    category: "Running Shoes",
    description: "High-performance running shoes"
  },
  {
    id: 17,
    name: "Own the Game 3 Shoes",
    price: 5699,
    discount: 5,
    image: "https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/9909be64592e4ab78396dc77aa3eb81f_9366/Own_the_Game_3_Shoes_Black_IF4566_01_standard.jpg",
    category: "Casual Shoes",
    description: "Classic streetwear shoes"
  },
  {
    id: 18,
    name: "Jogit Shoes",
    price: 7799.5,
    discount: 15,
    image: "https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/7ec24c88cceb4aa489a8682cd0585b66_9366/Jogit_Shoes_Black_JR0863_01_00_standard.jpg",
    category: "Lifestyle Shoes",
    description: "Comfortable lifestyle shoes"
  },

];

export default products;
