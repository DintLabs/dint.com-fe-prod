import Swal from 'sweetalert2';

export const alert = (config: any) => {
  Swal.fire(config);
};

export const configErrorAlert = ({
  title,
  text,
  footer = null
}: {
  title: string;
  text: string;
  footer: any | null;
}) => ({
  icon: 'error',
  title,
  text,
  footer
});

export const configWarnAlert = ({
  title,
  text,
  footer = null
}: {
  title: string;
  text: string;
  footer?: any | null;
}) => ({
  icon: 'warning',
  title,
  text,
  footer
});

export const configSuccessAlert = ({
  title,
  text,
  footer = null
}: {
  title: string;
  text: string;
  footer: any | null;
}) => ({
  icon: 'success',
  title,
  text,
  footer
});
