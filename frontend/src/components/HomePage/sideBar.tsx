import "bootstrap/dist/css/bootstrap.min.css";
import { ChangeEvent, useState } from "react";
import { Button, Form } from "react-bootstrap";
import CarsSearchForm from "../SearchForm/carsSearchForm";
import CarProps from "../../types/carProps";
import SearchPieceProps from "../../types/searchPieceProps";

export default function SideBar({
  handleSearch,
  formData,
  setFormData,
}: {
  handleSearch: () => void;
  formData: SearchPieceProps;
  setFormData: (formData: SearchPieceProps) => void;
}) {
  return (
    <div
      className="p-5"
      style={{
        backgroundColor: "aliceblue",
        marginTop: "0px",
        justifyItems: "center",
      }}
    >
      <h4 style={{paddingBottom:"20px",color:"#4169E1"}}>Filtres</h4>
      <CarsSearchForm
        formData={formData as CarProps}
        setFormData={setFormData}
      />
      <Form>
  <Form.Group className="mb-3 p-2">
  <Form.Label>Trier Par:</Form.Label>
  <Form.Select
    name="sortby"
    value={formData.sortBy}
    onChange={(e) => setFormData({ ...formData, sortBy: e.target.value })}
  >
    <option value="">Choisir le mode de tri</option>
    <option value="IncreasingPrice">Prix croissant</option>
    <option value="DecreasingPrice">Prix décroissant</option>
    <option value="AdditionDate">Date d'ajout</option>
  </Form.Select>
</Form.Group>
  



        <Button
          variant="primary"
          type="submit"
          className="mt-0 p-2"
          onClick={(e) => {
            e.preventDefault();
            handleSearch();
          }}
        >
          Rechercher
        </Button>
      </Form>
    </div>
  );
}
