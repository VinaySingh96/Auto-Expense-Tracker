import React, { createContext, useState, useContext, useRef } from 'react';

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [modalData, setModalData] = useState(null);
  const resolveModalRef = useRef(null); // Use a ref to store the resolve function

  const showModal = (component, props) => {
    return new Promise((resolve) => {
      resolveModalRef.current = resolve; // Store resolve function in ref

      setModalData({
        component,
        props: {
          ...props,
          onClose: () => hideModal(null), // Pass `null` when closed without saving
          onSave: (data) => hideModal(data), // Pass saved data on save
        },
      });
    });
  };

  const hideModal = (data) => {
    if (resolveModalRef.current) {
      resolveModalRef.current(data); // Resolve Promise with user input
      resolveModalRef.current = null; // Reset resolver function
    }
    setModalData(null);
  };

  return (
    <ModalContext.Provider value={{ showModal, hideModal }}>
      {children}
      {modalData && <modalData.component {...modalData.props} />}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);