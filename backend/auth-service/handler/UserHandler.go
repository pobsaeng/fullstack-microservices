package handler

//func FindUserByUsername(w http.ResponseWriter, r *http.Request) {
//	vars := mux.Vars(r)
//	user, err := service.GetUserByEmail(vars["username"], vars["password"])
//	if err != nil {
//		json.NewEncoder(w).Encode(err.Error())
//		return
//	}
//
//	w.Header().Set("Content-Type", "application/json")
//	w.WriteHeader(http.StatusOK)
//	json.NewEncoder(w).Encode(user)
//}
