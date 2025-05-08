export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">테스트용 동영상 플레이어</h1>
      <video
        controls
        width="720"
        className="rounded shadow-lg"
      >
        <source src="/sample.mp4" type="video/mp4" />
        브라우저가 video 태그를 지원하지 않습니다.
      </video>
    </main>
  );
}