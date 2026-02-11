package bonds

import (
	database "app/internal"
	repository "app/internal/adapter/sqlite"
	"app/internal/domain/entities"
)

type BondsController struct {
	Repository *repository.BondsRepo
}

func (r *BondsController) InsertBond(bond entities.Bond) error {
	return r.Repository.Insert(bond)
}

func (r *BondsController) GetBonds() []entities.Bond {
	return r.Repository.Get()
}

func CreateBondsController() *BondsController {

	repo := &repository.BondsRepo{Session: database.Connect()}

	return &BondsController{Repository: repo}
}