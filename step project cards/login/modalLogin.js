export default class ModalLogin {
   constructor() {
      this.modal = this.create()
   }
   create () {
      const modalWrapper = document.createElement("div");
      modalWrapper.classList.add("modal-wrapper");

      modalWrapper.innerHTML = `<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">Войти в аккаунт</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body"></div>
            </div>
          </div>
        </div>
        `;

      return modalWrapper.firstChild;
   }

   render(content) {
      const modalBody = this.modal.querySelector(".modal-body");
      modalBody.append(content);

      return this.modal;
   }

}
