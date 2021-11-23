export const clearBtn = document.querySelector('.btn-clear');

clearBtn.addEventListener('click', function () {
  localStorage.clear();
  window.location.reload();
});
