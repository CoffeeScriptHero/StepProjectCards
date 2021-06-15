const modalBtn = document.getElementById("login-btn");
const modal = document.getElementsByClassName(".modal");
const showModal = document.getElementsByClassName(".showModal");

modalBtn.addEventListener("click", (evt) => {
   evt.preventDefault();
   showModal.innerHTML = `
      <div class="modal" tabindex="-1">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Вход в аккаунт</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">@</span>
                    <input type="text" class="form-control" placeholder="Email" aria-label="Username" aria-describedby="basic-addon1">
                </div>

                <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon2">&#10003;</span>
                    <input type="text" class="form-control" placeholder="Password" aria-label="Password" aria-describedby="basic-addon1">
                </div>

            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Закрыть</button>
                <button type="button" class="btn btn-primary">Войти</button>
            </div>
        </div>
    </div>
</div>
   `
});

