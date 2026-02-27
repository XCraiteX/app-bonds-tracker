import { useState, useEffect } from "react";
import { entities } from "_/go/models";
import { AnimatePresence, motion } from "motion/react";

interface BondModalProps {
  isOpen: boolean;
  portfolioId?: number;
  onClose: () => void;
  onAdd: (p: string) => void;
  onEdit?: (p: entities.Portfolio) => void; // Новая функция для редактирования
  editPortfolio?: entities.Portfolio | null; // Облигация для редактирования
}

export default function PortfolioModal({ isOpen, onClose, onAdd, onEdit, editPortfolio, portfolioId }: BondModalProps) {
  const [portfolioTitle, setPortfolioTitle] = useState<string>("");

  // Заполняем форму при редактировании
  useEffect(() => {
    if (editPortfolio) {
      setPortfolioTitle(editPortfolio.Title);
    } else {
      // Сброс формы для добавления
      setPortfolioTitle("");
    }
  }, [editPortfolio, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editPortfolio && onEdit) {
      // Редактирование существующей облигации
      onEdit({ Id: editPortfolio.Id, Title: portfolioTitle });
    } else {
      // Добавление новой облигации
      onAdd(portfolioTitle);
    }

    onClose();
  };

  const isEditing = !!editPortfolio;
  const title = isEditing ? "Редактировать облигацию" : "Добавить облигацию";
  const buttonText = isEditing ? "Сохранить" : "Добавить";

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/40 glass:bg-black/60 flex items-center justify-center p-4 z-50 backdrop-blur-[6px]"
        >
          <div className="bg-background glass:bg-[#fff]/5 border border-border rounded-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold text-white mb-4">{title}</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  value={portfolioTitle}
                  onChange={(e) => setPortfolioTitle(e.target.value)}
                  className="w-full bg-black/20 rounded-lg px-3 py-2 text-white outline-none focus:ring-1 ring-blue-500/80"
                  placeholder="Название"
                  required
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium border border-border"
                >
                  {buttonText}
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 bg-background hover:bg-gray-700/30 text-gray-300 py-2 px-4 rounded-lg font-medium border border-border"
                >
                  Отмена
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
