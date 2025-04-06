// import React, { useState, useEffect } from "react";
// import "../assets/css/SearchButton.css"; // Assurez-vous que ce chemin est correct

// const SearchButton: React.FC = () => {
//     const [searchQuery, setSearchQuery] = useState<string>(""); // Stocke la requête utilisateur
//     const [results, setResults] = useState<Movie[]>([]); // Stocke les résultats de la recherche
//     const [error, setError] = useState<string | null>(null); // Stocke les erreurs éventuelles

//     interface Movie {
//         title: string;
//         // Ajoutez d'autres propriétés si nécessaire, selon votre API
//     }

//     // Fonction pour gérer la recherche dynamique
//     useEffect(() => {
//         const fetchMovies = async () => {
//             if (!searchQuery.trim()) {
//                 setResults([]); // Réinitialiser les résultats si la requête est vide
//                 return;
//             }

//             try {
//                 setError(null); // Réinitialiser les erreurs avant la recherche
//                 const response = await fetch(
//                     `/api/movie?query=${encodeURIComponent(searchQuery.charAt(0))}` // Recherche basée sur la première lettre
//                 );

//                 if (!response.ok) {
//                     throw new Error("Erreur lors de la recherche. Veuillez réessayer.");
//                 }

//                 const data: Movie[] = await response.json(); // Supposons que l'API retourne un tableau de films
//                 setResults(data); // Mettre à jour les résultats
//             } catch (err) {
//                 setError(
//                     err instanceof Error
//                         ? err.message
//                         : "Une erreur inconnue est survenue."
//                 );
//             }
//         };

//         fetchMovies();
//     }, [searchQuery]); // Déclencher la recherche à chaque changement de `searchQuery`

//     // Fonction pour gérer la recherche manuelle (bouton)
//     const handleSearch = async () => {
//         if (!searchQuery.trim()) return; // Ne rien faire si la requête est vide

//         try {
//             setError(null); // Réinitialiser les erreurs avant la recherche
//             const response = await fetch(
//                 `/api/movie?query=${encodeURIComponent(searchQuery)}` // Appel à votre backend
//             );

//             if (!response.ok) {
//                 throw new Error("Erreur lors de la recherche. Veuillez réessayer.");
//             }

//             const data: Movie[] = await response.json(); // Supposons que l'API retourne un tableau de films
//             setResults(data); // Mettre à jour les résultats
//         } catch (err) {
//             setError(
//                 err instanceof Error
//                     ? err.message
//                     : "Une erreur inconnue est survenue."
//             );
//         }
//     };

//     return (
//         <div className="search-container">
//             <div className="search-input-container">
//                 <input
//                     type="text"
//                     placeholder="Rechercher un titre..."
//                     className="search-input"
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)} // Mettre à jour la requête utilisateur
//                 />
//             </div>
//             <button
//                 type="button"
//                 className="search-icon-button"
//                 onClick={handleSearch} // Appeler la fonction de recherche manuelle
//             >
//                 <svg
//                     width="24"
//                     height="24"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     stroke="currentColor"
//                 >
//                     <title>Search icon</title>
//                     <path
//                         d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
//                         strokeWidth="2"
//                         strokeLinecap="round"
//                     />
//                 </svg>
//             </button>
//             {/* Afficher une erreur si elle existe */}
//             {error && <div className="error-message">{error}</div>}
//             {/* Afficher les résultats */}
//             <div className="search-results">
//                 {results.length > 0 ? (
//                     results.map((movie) => (
//                         <div key={movie.title} className="search-result-item">
//                             {movie.title}
//                         </div>
//                     ))
//                 ) : (
//                     <p className="no-results">Aucun résultat trouvé.</p>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default SearchButton;
