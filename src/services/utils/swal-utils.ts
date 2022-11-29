
import Swal from 'sweetalert2';

export const swal = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success ml-3',
      cancelButton: 'btn btn-danger'
    },
    icon: 'question',
    buttonsStyling: false,
    showCancelButton: true,
    confirmButtonText: 'Proceed',
    reverseButtons: true
});

export const swalSuccess = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    icon: 'success',
    buttonsStyling: false,
    showCancelButton: true,
    confirmButtonText: 'Proceed',
    reverseButtons: true
});

export const swalDanger = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-danger',
      cancelButton: 'btn btn-secondary'
    },
    icon: 'error',
    buttonsStyling: false,
    showCancelButton: true,
    confirmButtonText: 'Proceed',
    reverseButtons: true
});