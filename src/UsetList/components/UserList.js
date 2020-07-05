import React, { useState, useEffect } from "react";
import { MDBCard, MDBTable, MDBTableHead, MDBTableBody } from "mdbreact";
import { useHttpClient } from "../../shared/hooks/http-hook";
import "../../css/style.css";
import ErrorModal from "../../shared/UIElements/ErrorModel";
import SuccesModal from "../../shared/UIElements/SuccesModal";
import Loading from "../../shared/UIElements/Loading";

const UserList = () => {
  const [loadedPlaces, setLoadedPlaces] = useState();
  const [count, setCount] = useState(0);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL
        );
        setLoadedPlaces(responseData.trips);
      } catch (err) {}
    };
    fetchPlaces();
  }, [sendRequest]);

  console.log(loadedPlaces);
  return (
    <React.Fragment>
      {isLoading && <Loading />}
      <ErrorModal error={error} onClear={clearError} />
      <MDBCard>
        <MDBTable>
          <MDBTableHead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>National Id</th>
              <th>Phone Number</th>
              <th>Opinion</th>
              <th>Destination</th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {!isLoading &&
              loadedPlaces &&
              loadedPlaces.map((user, index) => {
                return (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.email}</td>
                    <td>{user.nationalId}</td>
                    <td>{user.phoneNumber}</td>
                    <td>{user.opinion}</td>
                    <td>{user.destination}</td>
                  </tr>
                );
              })}
          </MDBTableBody>
        </MDBTable>
      </MDBCard>
    </React.Fragment>
  );
};

export default UserList;
