def calcular_resultados(res_par_uno, res_par_dos):
    """
    Calcula la diferencia de puntos entre las parejas y verifica que la suma de las diferencias sea 0.
    
    Args:
        puntos_pareja_uno (int): Puntos de la pareja uno.
        puntos_pareja_dos (int): Puntos de la pareja dos.
    
    Returns:
        tuple: Diferencia de puntos de la pareja uno respecto a la pareja dos y viceversa.
    
    Raises:
        ValueError: Si la suma de las diferencias no es 0.
    """
    
    # Calcular la diferencia de puntos de la pareja uno respecto a la pareja dos.
    puntos_pareja_uno = res_par_uno - res_par_dos
    
    # Calcular la diferencia de puntos de la pareja dos respecto a la pareja uno.
    puntos_pareja_dos = res_par_dos - res_par_uno

    # Verificar que la suma de las diferencias sea 0.
    if puntos_pareja_uno + puntos_pareja_dos != 0:
        raise ValueError("La suma de puntos de la pareja uno y puntos de la pareja dos debe ser 0")

    # Retornar las diferencias calculadas.
    return puntos_pareja_uno, puntos_pareja_dos
