import styled from "@emotion/styled";

export const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
`;

export const Barra = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
`;

export const CampoBusqueda = styled.input`
  flex: 1;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 16px;
`;

export const Tarjeta = styled.div`
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  text-align: left;
`;

export const Fondo = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Modal = styled.div`
  background: white;
  color: black;
  padding: 20px;
  border-radius: 8px;
  width: 340px;
`;

export const Formulario = styled.form`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const Botones = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 10px;
`;

export const TextoError = styled.p`
  color: red;
`;