import { useState, useCallback } from 'react';
import AlertDialog from './AlertDialog';

const useAlertDialog = () => {
  // Set up the default state for the dialog
  const [dialogConfig, setDialogConfig] = useState({
    show: false,
    title: '',
    message: '',
    onConfirm: null,
    onCancel: null,
    confirmLabel: 'Confirm',
    cancelLabel: 'Cancel',
  });

  const showAlertDialog = useCallback((title, message, options = {}) => {
    setDialogConfig({
      show: true,
      title,
      message,
      onConfirm: options.onConfirm || null,
      onCancel: options.onCancel || (() => setDialogConfig((prev) => ({ ...prev, show: false }))),
      confirmLabel: options.confirmLabel || 'Confirm',
      cancelLabel: options.cancelLabel || 'Close'
    });
  }, []);

  const handleHideDialog = useCallback(() => {
    setDialogConfig((prev) => ({ ...prev, show: false }));
  }, []);

  const handleConfirm = useCallback(() => {
    if (dialogConfig.onConfirm) dialogConfig.onConfirm();
    handleHideDialog();
  }, [dialogConfig, handleHideDialog]);

  const handleCancel = useCallback(() => {
    if (dialogConfig.onCancel) dialogConfig.onCancel();
    handleHideDialog();
  }, [dialogConfig, handleHideDialog]);

  const alertDialog = dialogConfig.onConfirm ? (
    // Render Confirm Dialog with both confirm and cancel actions
    <AlertDialog
      show={dialogConfig.show}
      onHide={handleHideDialog}
      onConfirm={handleConfirm}
      onCancel={handleCancel}
      title={dialogConfig.title}
      message={dialogConfig.message}
      confirmLabel={dialogConfig.confirmLabel}
      cancelLabel={dialogConfig.cancelLabel}
    />
  ) : (
    // Render Alert Dialog with only a cancel action
    <AlertDialog
      show={dialogConfig.show}
      onHide={handleHideDialog}
      title={dialogConfig.title}
      message={dialogConfig.message}
      cancelLabel={dialogConfig.cancelLabel}
    />
  );

  return { showAlertDialog, alertDialog };
};

export default useAlertDialog;
