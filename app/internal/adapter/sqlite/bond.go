package repository

import (
	entities "app/internal/domain/entities"
	"database/sql"
)

type BondsRepo struct {
	Session *sql.DB
}

func (r *BondsRepo) Insert(bond entities.Bond) error {
	_, err := r.Session.Exec("INSERT INTO bonds (name, nominal, coupon, months, day, quantity) VALUES (?, ?, ?, ?, ?, ?)", bond.Name, bond.Nominal, bond.Coupon, bond.Months, bond.Day, bond.Quantity)

	return err
}

func (r *BondsRepo) Get() []entities.Bond {
	result, _ := r.Session.Query("SELECT * FROM bonds")

	bonds := []entities.Bond{}

	for result.Next() {
		var b entities.Bond

		err := result.Scan(&b.Id, &b.Name, &b.Nominal, &b.Coupon, &b.Months, &b.Day, &b.Quantity)

		if err != nil {
			panic(err)
		}

		bonds = append(bonds, b)
	}

	return bonds
}