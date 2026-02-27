package repository

import (
	entities "app/internal/domain/entities"
	"database/sql"
)

type PortfoliosRepo struct {
	Session *sql.DB
}

func (r *PortfoliosRepo) Insert(p string) error {
	_, err := r.Session.Exec("INSERT INTO portfolios (title) VALUES (?)", p)

	return err
}

func (r *PortfoliosRepo) Get() []entities.Portfolio {
	result, _ := r.Session.Query("SELECT * FROM portfolios")

	portfolios := []entities.Portfolio{}

	for result.Next() {
		var b entities.Portfolio

		result.Scan(&b.Id, &b.Title)

		portfolios = append(portfolios, b)
	}

	return portfolios
}

func (r *PortfoliosRepo) Update(p entities.Portfolio) bool {
	_, err := r.Session.Exec("UPDATE portfolios SET title = ? WHERE id = ?", p.Title, p.Id)

	if err != nil {
		panic(err)
	}

	return true
}

func (r *PortfoliosRepo) Delete(id int16) bool {
	_, err := r.Session.Exec("DELETE FROM portfolios WHERE id = ?", id)

	if err != nil {
		panic(err)
	}

	return true
}
