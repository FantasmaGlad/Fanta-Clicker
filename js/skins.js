/* Styles pour la gestion des usines */

.sidebar-right .usine {
  background-color: rgba(255, 255, 255, 0.9);
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  text-align: center;
}

.sidebar-right .usine h3 {
  font-size: 1.2rem;
  color: #6a5acd;
  margin-bottom: 0.5rem;
}

.sidebar-right .usine p {
  font-size: 1rem;
  color: #333;
}

.sidebar-right .usine img {
  width: 80px;
  height: 80px;
  margin: 0.5rem 0;
  border-radius: 10%;
}

.sidebar-right .usine button {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  color: #fff;
  background-color: #6a5acd;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.sidebar-right .usine button:hover {
  background-color: #5a4db2;
}

.usine.locked img {
  filter: grayscale(100%);
  opacity: 0.5;
}

.usine.locked button {
  background-color: #aaa;
  cursor: not-allowed;
}

.usine.locked button:hover {
  background-color: #aaa;
  transform: none;
}