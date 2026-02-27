package controller

import (
	database "app/internal"
	repository "app/internal/adapter/sqlite"
	"app/internal/domain/entities"
)

type PortfoliosController struct {
	Repository *repository.PortfoliosRepo
}

func (r *PortfoliosController) InsertPortfolio(p string) error {
	return r.Repository.Insert(p)
}


func (r *PortfoliosController) GetPortfolios() []entities.Portfolio {
	return r.Repository.Get()
}

func (r *PortfoliosController) UpdatePortfolio(p entities.Portfolio) bool {
	return r.Repository.Update(p)
}

func (r *PortfoliosController) DeletePortfolio(id int16) bool {
	return r.Repository.Delete(id)
}

func CreatePortfoliosController() *PortfoliosController {

	repo := &repository.PortfoliosRepo{Session: database.Connect()}

	return &PortfoliosController{Repository: repo}
}