namespace ShippingCalculatorP2.Domain.Models
{
    public class ResultadoEnvio
    {
        public string Pais { get; set; }
        public double Peso { get; set; }
        public double TarifaPorKg { get; set; }
        public double CostoTotal { get; set; }
    }
}
