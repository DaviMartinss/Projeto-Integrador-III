
function confirmar() {
  Swal.fire({
    title: "Você tem certeza?",
    text: `Você não poderá reverter isso!`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sim, excluir!",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.value) {
      window.location.href = '/deleteUser';
    }
  });
}


// const submite = document.getElementById("submitSenha");
//
// const Toast = Swal.mixin({
//   toast: true,
//   position: "top-end",
//   showConfirmButton: false,
//   timer: 3000,
//   timerProgressBar: true,
//   didOpen: (toast) => {
//     toast.addEventListener("mouseenter", Swal.stopTimer);
//     toast.addEventListener("mouseleave", Swal.resumeTimer);
//   },
// });
//
// Toast.fire({
//   icon: "success",
//   title: "Alterado com Sucesso",
// });
//
//
// submite.addEventListener("click", function(e) {
//
//   let password = document.getElementById("Password");
//   let password2 = document.getElementById("Password2");
//
//   const Toast = Swal.mixin({
//     toast: true,
//     position: "top-end",
//     showConfirmButton: false,
//     timer: 3000,
//     timerProgressBar: true,
//     didOpen: (toast) => {
//       toast.addEventListener("mouseenter", Swal.stopTimer);
//       toast.addEventListener("mouseleave", Swal.resumeTimer);
//     },
//   });
//
//   Toast.fire({
//     icon: "success",
//     title: "Alterado com Sucesso",
//   });
//
//   if(password.value === password2.value)
//   {
//     const Toast = Swal.mixin({
// 			toast: true,
// 			position: "top-end",
// 			showConfirmButton: false,
// 			timer: 3000,
// 			timerProgressBar: true,
// 			didOpen: (toast) => {
// 				toast.addEventListener("mouseenter", Swal.stopTimer);
// 				toast.addEventListener("mouseleave", Swal.resumeTimer);
// 			},
// 		});
//
// 		Toast.fire({
// 			icon: "success",
// 			title: "Alterado com Sucesso",
// 		});
//   }
//   else
//   {
//     //e.preventDefault();
//
//     const Toast = Swal.mixin({
// 			toast: true,
// 			position: "top-end",
// 			showConfirmButton: false,
// 			timer: 3000,
// 			timerProgressBar: true,
// 			didOpen: (toast) => {
// 				toast.addEventListener("mouseenter", Swal.stopTimer);
// 				toast.addEventListener("mouseleave", Swal.resumeTimer);
// 			},
// 		});
//
// 		Toast.fire({
// 			icon: "warning",
// 			title: "Senhas Diferentes!",
// 		});
//
//     //window.history.back();
//   }
//
// });
