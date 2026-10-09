import { useDispatch, useSelector } from "react-redux";
import {
  addProductToWishList,
  removeProductFromWishList,
} from "@redux/userAccount/accountThunk";
import { useNavigate } from "react-router-dom";

export default function BtnAddProdToWishList({
  children,
  prodId,
  setAddedProdToWishList,
  ...props
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isAuth = useSelector((state) => state.userAccount.accountData.isAuth);

  const wishList = useSelector(
    (state) => state.userAccount.accountData.userData?.wishList,
  );

  const processingAddItemInWishList = () => {
    if (!isAuth) {
      navigate("/uvelio/auth-form");
      return;
    }

    if (wishList.length > 0 && wishList.includes(prodId)) {
      dispatch(removeProductFromWishList(prodId));
      setAddedProdToWishList(false);
      return;
    }

    dispatch(addProductToWishList(prodId));
    setAddedProdToWishList(true);
  };

  return (
    <button onClick={processingAddItemInWishList} {...props}>
      {children}
    </button>
  );
}
