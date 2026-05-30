(() => {
  "use strict";

  const forms = document.querySelectorAll(".needs-validation");

  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        let isValid = true;

        // 🔹 Bootstrap validation
        if (!form.checkValidity()) {
          isValid = false;
        }

        // 🔹 Category validation
        const checkboxes = form.querySelectorAll('input[name="categories"]');

        if (checkboxes.length > 0) {
          let checked = false;

          checkboxes.forEach((cb) => {
            if (cb.checked) checked = true;
          });

          if (!checked) {
            isValid = false;
            alert("Please select at least 1 category");
          }
        }

        // 🔴 FINAL STOP
        if (!isValid) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add("was-validated");
      },
      false,
    );
  });
})();

document.querySelectorAll(".wishlist-btn").forEach((btn) => {
  btn.addEventListener("click", async () => {
    const id = btn.dataset.id;

    const res = await fetch(`/wishlist/add/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (data.success) {
      btn.innerText = "❤️ Added";
    }
  });
});

document.querySelectorAll(".wishlist-btn-remove").forEach((btn) => {
  btn.addEventListener("click", async () => {
    const id = btn.dataset.id;

    const res = await fetch(`/wishlist/remove/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (data.success) {
      btn.innerText = "Removed";
    }
  });
});
