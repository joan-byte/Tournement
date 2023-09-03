def calcular_resultados(puntos_pareja_uno, puntos_pareja_dos):
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
    res_par_uno = puntos_pareja_uno - puntos_pareja_dos
    
    # Calcular la diferencia de puntos de la pareja dos respecto a la pareja uno.
    res_par_dos = puntos_pareja_dos - puntos_pareja_uno

    # Verificar que la suma de las diferencias sea 0.
    if res_par_uno + res_par_dos != 0:
        raise ValueError("La suma de res_par_uno y res_par_dos debe ser 0")

    # Retornar las diferencias calculadas.
    return res_par_uno, res_par_dos
