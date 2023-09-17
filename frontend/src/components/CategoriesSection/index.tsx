import Label from "./label";
import "./categories.css";
import { useEffect, useState } from "react";
import { GrAddCircle } from "react-icons/gr";
import { Button, Col, Row } from "react-bootstrap";
import EditCategory from "./editCategory";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import { deleteCategory, getCategoriesFromApi } from "../../apis/categoryApis";
import { useUserRole } from "../../utils/getRole";
import { useDispatch, useSelector } from "react-redux";
import { update } from "../../store";

interface CategoryProps {
  parent?: number;
  id: number;
  label: string;
  image: string;
}

export default function CategoriesSection() {
  const updateData = useSelector((state: any) => state.update);
  const dispatch = useDispatch();
  useUserRole(["admin"]);
  const [categories, setCategories] = useState([] as CategoryProps[][]);
  const [selected, setSelected] = useState([] as number[]);
  const [data, setData] = useState({});
  const [isHidden, setIsHidden] = useState(true);

  const getCategories = async (id?: number, index?: number) => {
    let newCategories = [...categories];
    if (!index || index < 1) {
      try {
        let data = await getCategoriesFromApi(id);
        if (index !== undefined) {
          newCategories[index + 1] = data;
        } else {
          newCategories[0] = data;
        }
        setCategories(newCategories);
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    console.log("update", updateData);
    getCategories();
  }, [updateData]);


  return (
    <>
      <div className="custom-container" style={{ position: "relative" }}>
        <h1>Catégories</h1>

        {categories.length !== 0 &&
          categories.map((catList, index) => (
            <Row>
              <Col xs={10} key={index}>
                <Slide
                  autoplay={false}
                  infinite={true}
                  slidesToShow={index == 0 ? 1 : 1}
                >
                  {Object.values(catList).map((cat) => {
                    return (
                      <div
                        key={cat.id}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          backgroundSize: "cover",
                          height: "200px",
                        }}
                        onClick={() => {
                          let newSelected = [...selected];
                          if (categories.length > index + 1) {
                            newSelected.length = index + 1;
                            categories.length = index + 1;
                          }
                          newSelected[index] = cat.id;
                          setSelected(newSelected);
                          setCategories(categories);
                          if (newSelected.includes(cat.id))
                            getCategories(cat.id, index);
                        }}
                      >
                        <Label
                          key={cat.id}
                          selected={selected.includes(cat.id)}
                          {...cat}
                        />
                      </div>
                    );
                  })}
                </Slide>
              </Col>
              <Col
                size={1}
                key={index}
                className="icon"
                onClick={() => {
                  setIsHidden(false);
                  setData({ id: -1, parent: selected[index - 1] });
                }}
              >
                <GrAddCircle size={index === 0 ?60 : 30} />
              </Col>
            </Row>
          ))}

        <div className="container">
          <Button
            variant="primary"
            disabled={selected.length === 0}
            onClick={() => {
              setIsHidden(false);
              setData({ id: selected[selected.length - 1], parent: selected[selected.length - 2] });
            }}
          >
            Modifier
          </Button>

          <Button
            variant="primary"
            disabled={selected.length === 0}
            onClick={async () => {
              await deleteCategory(selected[selected.length - 1]);
              dispatch(update());
            }}
          >
            Supprimer
          </Button>
        </div>
        <EditCategory
          isHidden={isHidden}
          hide={() => setIsHidden(true)}
          {...data}
        />
        <ToastContainer position="bottom-right" />
      </div>
    </>
  );
}
