import { useDispatch, useSelector } from "react-redux";

// Export a hook that can be reused to resolve types
// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;
