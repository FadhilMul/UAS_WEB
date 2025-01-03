// Set current date
const options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};
const currentDate = new Date().toLocaleDateString("id-ID", options);
document.getElementById("current-date").textContent = currentDate;

document.addEventListener("DOMContentLoaded", () => {
  const categoryButtons = document.querySelectorAll(".category-btn");
  const searchInput = document.getElementById("menu-search");
  const menuItems = document.querySelectorAll(".menu-item-card");

  const filterMenu = () => {
    const selectedCategory = document
      .querySelector(".category-btn.active")
      .getAttribute("data-category");
    const searchValue = searchInput.value.toLowerCase();

    menuItems.forEach((item) => {
      const itemCategory = item.getAttribute("data-category");
      const menuName = item
        .querySelector(".menu-name")
        .textContent.toLowerCase();

      // Filter berdasarkan kategori dan pencarian
      if (
        (selectedCategory === "all" || itemCategory === selectedCategory) &&
        menuName.includes(searchValue)
      ) {
        item.style.display = "block"; // Tampilkan item
      } else {
        item.style.display = "none"; // Sembunyikan item
      }
    });
  };

  // Event listener untuk kategori
  categoryButtons.forEach((button) => {
    button.addEventListener("click", () => {
      categoryButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");
      filterMenu();
    });
  });

  // Event listener untuk pencarian
  searchInput.addEventListener("input", filterMenu);
});

document.addEventListener("DOMContentLoaded", () => {
  const cartContainer = document.querySelector(".order-items-container");
  const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");
  const summarySubtotal = document.querySelector(".subtotal-value");
  const modal = document.querySelector("#orderConfirmationModal");
  const modalMenuItems = document.querySelector("#menuItems");
  const modalOrderType = document.querySelector("#orderType");
  const modalCustomerName = document.querySelector("#customerName");
  const modalCustomerPhone = document.querySelector("#customerPhone");
  const modalDiscount = document.querySelector("#discount");
  const modalTotal = document.querySelector("#total");
  const confirmOrderButton = document.querySelector("#confirmOrder");

  let cart = {}; // Menyimpan item di keranjang
  let orderType = "Dine In"; // Default order type

  // Fungsi untuk memperbarui keranjang
  const updateCart = () => {
    cartContainer.innerHTML = ""; // Kosongkan isi keranjang sebelum render ulang
    let subtotal = 0;

    for (const [key, item] of Object.entries(cart)) {
      const itemTotal = item.price * item.quantity;
      subtotal += itemTotal;

      // Buat elemen item keranjang
      const cartItem = document.createElement("div");
      cartItem.classList.add("order-item");
      cartItem.innerHTML = `
        <div class="d-flex justify-content-between align-items-center">
          <div>
            <p class="order-item-name">${item.name}</p>
            <p class="order-item-note">Rp ${item.price.toLocaleString()}</p>
          </div>
          <div class="d-flex align-items-center">
            <input type="number" class="order-qty-input" value="${
              item.quantity
            }" min="1" />
            <p class="order-item-price ms-3">Rp ${itemTotal.toLocaleString()}</p>
            <button class="delete-btn ms-3">
              <i class="bi bi-trash"></i>
            </button>
          </div>
        </div>
      `;

      // Event: Mengubah kuantitas
      cartItem
        .querySelector(".order-qty-input")
        .addEventListener("input", (e) => {
          const newQty = parseInt(e.target.value, 10);
          if (newQty > 0) {
            item.quantity = newQty;
            updateCart();
          }
        });

      // Event: Menghapus item
      cartItem.querySelector(".delete-btn").addEventListener("click", () => {
        delete cart[key];
        updateCart();
      });

      cartContainer.appendChild(cartItem);
    }

    // Perbarui subtotal
    summarySubtotal.textContent = `Rp ${subtotal.toLocaleString()}`;
  };

  // Event: Menambahkan item ke keranjang
  addToCartButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const menuItem = e.target.closest(".menu-item-card");
      const name = menuItem.querySelector(".menu-name").textContent;
      const price = parseInt(
        menuItem.querySelector(".menu-price").textContent.replace(/[^\d]/g, "")
      );

      if (cart[name]) {
        cart[name].quantity++;
      } else {
        cart[name] = { name, price, quantity: 1 };
      }

      updateCart();
    });
  });

  // Event: Mengubah tipe pesanan
  document.querySelectorAll(".type-order-btn").forEach((button) => {
    button.addEventListener("click", () => {
      document
        .querySelectorAll(".type-order-btn")
        .forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");
      orderType = button.textContent; // Simpan tipe pesanan
    });
  });

  // Event: Tampilkan modal dengan data dinamis
  const showModal = () => {
    modalOrderType.textContent = orderType;

    modalMenuItems.innerHTML = ""; // Kosongkan daftar menu
    let total = 0;

    for (const item of Object.values(cart)) {
      const listItem = document.createElement("li");
      listItem.textContent = `${item.name} x ${item.quantity} - Rp ${(
        item.price * item.quantity
      ).toLocaleString()}`;
      modalMenuItems.appendChild(listItem);
      total += item.price * item.quantity;
    }

    modalDiscount.textContent = "Rp 0"; // Asumsi tanpa diskon
    modalTotal.textContent = `Rp ${total.toLocaleString()}`;
  };

  // Event: Klik tombol Confirm Payment
  confirmOrderButton.addEventListener("click", () => {
    alert("Order confirmed!");
    cart = {}; // Kosongkan keranjang setelah konfirmasi
    updateCart();
    modal.querySelector(".btn-close").click(); // Tutup modal
  });

  // Tombol untuk membuka modal
  document.querySelector(".btn-danger").addEventListener("click", showModal);

  // Inisialisasi keranjang kosong
  updateCart();
});

document.addEventListener("DOMContentLoaded", () => {
  const orderTypeButtons = document.querySelectorAll(".type-order-btn");

  orderTypeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Hapus kelas 'active' dari semua tombol
      orderTypeButtons.forEach((btn) => btn.classList.remove("active"));

      // Tambahkan kelas 'active' ke tombol yang diklik
      button.classList.add("active");
    });
  });
});
