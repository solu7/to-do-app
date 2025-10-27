import { useState, useEffect } from "react";

/**
 * Hook para obtener toda la data de una entidad (tags, categorías, etc)
 * para el usuario actual.
 * @param {Function} serviceFunction - La función que hace la llamada a la API.
 * @returns {Array<Object>} Una lista con todos los objetos de la entidad.
 */
const useFetchAllData = (serviceFunction) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await serviceFunction();
        setData(fetchedData);
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };
    fetchData();
  }, [serviceFunction]);

  return data;
};

export default useFetchAllData;