package repository

import (
	entities "app/internal/domain/entities"
	"database/sql"
)

type BondsRepo struct {
	Session *sql.DB
}

func (r *BondsRepo) Insert(bond entities.Bond) error {
	_, err := r.Session.Exec("INSERT INTO bonds (company, name, portfolio, nominal, coupon, months, day, quantity) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", bond.Company, bond.Name, bond.Portfolio, bond.Nominal, bond.Coupon, bond.Months, bond.Day, bond.Quantity)

	if err != nil {
		panic(err)
	}

	return err
}

func (r *BondsRepo) Get() []entities.Bond {
	result, _ := r.Session.Query("SELECT * FROM bonds")

	bonds := []entities.Bond{}

	for result.Next() {
		var b entities.Bond

		err := result.Scan(&b.Id, &b.Portfolio, &b.Company, &b.Name, &b.Nominal, &b.Coupon, &b.Months, &b.Day, &b.Quantity)

		if err != nil {
			panic(err)
		}

		bonds = append(bonds, b)
	}

	return bonds
}


func (r *BondsRepo) Update(bond entities.Bond) bool {
	_, err := r.Session.Exec("UPDATE bonds SET company = ?, name = ?, portfolio = ?, nominal = ?, coupon = ?, months = ?, day = ?, quantity = ? WHERE id = ?", bond.Company, bond.Name, bond.Portfolio, bond.Nominal, bond.Coupon, bond.Months, bond.Day, bond.Quantity, bond.Id)

	if err != nil {
		panic(err)
	}

	return true
}

func (r *BondsRepo) Delete(id int16) bool {
	_, err := r.Session.Exec("DELETE FROM bonds WHERE id = ?", id)

	if err != nil {
		panic(err)
	}

	return true
}
