document.addEventListener("DOMContentLoaded", () => {
  document
    .querySelectorAll(".markdown table")
    .forEach((table) => {
      // Nếu table đã được bọc rồi thì bỏ qua
      if (table.parentElement.classList.contains("markdown-table")) return;

      const wrapper = document.createElement("div");
      wrapper.className = "markdown-table";

      table.parentNode.insertBefore(wrapper, table);
      wrapper.appendChild(table);
    });
});
