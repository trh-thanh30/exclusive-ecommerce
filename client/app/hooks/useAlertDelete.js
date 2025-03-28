import Swal from "sweetalert2";

export default function useAlertDelete({ textDelete, functionDelete }) {
  const alertDelete= (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You want to delete ${textDelete}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#34D399",
      cancelButtonColor: "#F56565",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
        functionDelete(id);
      }
    });
  };
  return { alertDelete };
}
