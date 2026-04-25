using System;
using ShippingCalculatorP2.Application.Services;
using ShippingCalculatorP2.Domain.Models;

namespace ShippingCalculatorP2.Presentation
{
    class Program
    {
        static void Main(string[] args)
        {
            ServicioEnvio servicio = new ServicioEnvio();

            Console.WriteLine("==============================================");
            Console.WriteLine("  Calculadora de Tarifas de Envio Internacional");
            Console.WriteLine("  P2 - Francis");
            Console.WriteLine("  Clean Architecture + Factory Pattern");
            Console.WriteLine("==============================================");
            Console.WriteLine();

            double peso = ObtenerPeso();
            string pais = ObtenerPais();

            ResultadoEnvio resultado = servicio.CalcularEnvio(peso, pais);

            if (resultado != null)
            {
                MostrarResultado(resultado);
            }
            else
            {
                Console.WriteLine("Error: Pais no soportado.");
            }

            Console.WriteLine();
            Console.WriteLine("Presione cualquier tecla para salir...");
            Console.ReadKey();
        }

        static double ObtenerPeso()
        {
            Console.Write("Ingrese el peso del paquete (en kg): ");
            string entrada = Console.ReadLine();
            double peso;

            while (!double.TryParse(entrada, out peso) || peso <= 0)
            {
                Console.Write("Error. Ingrese un peso valido (mayor a 0): ");
                entrada = Console.ReadLine();
            }

            return peso;
        }

        static string ObtenerPais()
        {
            Console.WriteLine();
            Console.WriteLine("Paises disponibles:");
            Console.WriteLine("  1 - India");
            Console.WriteLine("  2 - Estados Unidos (US)");
            Console.WriteLine("  3 - Reino Unido (UK)");
            Console.WriteLine();
            Console.Write("Seleccione el pais de destino (1, 2 o 3): ");
            string opcion = Console.ReadLine();

            while (opcion != "1" && opcion != "2" && opcion != "3")
            {
                Console.Write("Opcion no valida. Seleccione 1, 2 o 3: ");
                opcion = Console.ReadLine();
            }

            return opcion;
        }

        static void MostrarResultado(ResultadoEnvio resultado)
        {
            Console.WriteLine();
            Console.WriteLine("==============================================");
            Console.WriteLine("  RESULTADO DEL CALCULO");
            Console.WriteLine("==============================================");
            Console.WriteLine("  Pais de destino:   " + resultado.Pais);
            Console.WriteLine("  Peso del paquete:  " + resultado.Peso + " kg");
            Console.WriteLine("  Tarifa por kg:     " + resultado.TarifaPorKg + " USD");
            Console.WriteLine("  COSTO TOTAL:       " + resultado.CostoTotal + " USD");
            Console.WriteLine("==============================================");
        }
    }
}
