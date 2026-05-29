import Button from "@/components/ui/Button";

export default function Home() {
  return (
    <main
      className="container"
      style={{
        paddingTop: "40px",
      }}
    >
      <h1
        style={{
          fontSize: "48px",
          marginBottom: "24px",
        }}
      >
        Vejboden.dk
      </h1>

      <Button>
        Find vejboder
      </Button>
    </main>
  );
}